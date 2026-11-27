<?php
/**
 * Plugin Name: ChinaFreeWeight CMS
 * Description: Product catalog and publishing controls for the ChinaFreeWeight headless site.
 * Version: 1.0.1
 */

defined('ABSPATH') || exit;

const CFW_PRODUCT = 'cfw_product';
const CFW_CATEGORY = 'cfw_product_category';
const CFW_CATEGORIES = [
    'dumbbells' => '哑铃',
    'weight-plates' => '杠铃片',
    'gym-accessories' => '健身配件',
];
const CFW_FIELDS = [
    'weight_range' => '重量范围',
    'material' => '材质或类型',
    'gallery' => '图库',
    'seo_title' => 'SEO 标题',
    'seo_description' => 'SEO 描述',
];

function cfw_register_content() {
    $supports = ['title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'custom-fields'];
    register_post_type(CFW_PRODUCT, [
        'labels' => ['name' => '产品', 'singular_name' => '产品', 'add_new_item' => '新增产品', 'edit_item' => '编辑产品'],
        'public' => true,
        // WordPress requires publicly viewable posts for anonymous REST term embeds.
        'publicly_queryable' => true,
        'rewrite' => false,
        'query_var' => false,
        'show_in_rest' => true,
        'rest_base' => 'cfw-products',
        'menu_icon' => 'dashicons-products',
        'capability_type' => 'post',
        'map_meta_cap' => true,
        'supports' => $supports,
    ]);
    register_taxonomy(CFW_CATEGORY, CFW_PRODUCT, [
        'label' => '产品分类',
        'public' => false,
        'show_ui' => true,
        'show_in_rest' => true,
        'rest_base' => 'cfw-product-categories',
        'rewrite' => false,
    ]);
    foreach (CFW_FIELDS as $key => $label) {
        if ($key === 'gallery') {
            register_post_meta(CFW_PRODUCT, 'cfw_gallery', [
                'single' => true,
                'type' => 'array',
                'default' => [],
                'show_in_rest' => ['schema' => ['type' => 'array', 'items' => ['type' => 'integer']]],
                'sanitize_callback' => 'cfw_gallery_ids',
            ]);
            continue;
        }
        register_post_meta(CFW_PRODUCT, "cfw_$key", [
            'single' => true,
            'type' => 'string',
            'show_in_rest' => true,
            'sanitize_callback' => 'sanitize_text_field',
        ]);
    }
    foreach (['post', CFW_PRODUCT] as $type) {
        register_post_meta($type, 'cfw_next_pilot', [
            'single' => true,
            'type' => 'boolean',
            'default' => false,
            'show_in_rest' => true,
            'sanitize_callback' => 'rest_sanitize_boolean',
        ]);
    }
    foreach (['post', CFW_PRODUCT] as $type) {
        remove_post_type_support($type, 'comments');
        remove_post_type_support($type, 'trackbacks');
    }
}
add_action('init', 'cfw_register_content');

add_action('template_redirect', function () {
    if (is_singular(CFW_PRODUCT) && !is_preview()) {
        global $wp_query;
        $wp_query->set_404();
        status_header(404);
        nocache_headers();
    }
});

register_activation_hook(__FILE__, function () {
    cfw_register_content();
    foreach (CFW_CATEGORIES as $slug => $label) {
        if (!term_exists($slug, CFW_CATEGORY)) {
            wp_insert_term($label, CFW_CATEGORY, ['slug' => $slug]);
        }
    }
    update_option('users_can_register', 0);
    update_option('default_comment_status', 'closed');
    update_option('default_ping_status', 'closed');
    update_option('blog_public', 0);
});

add_filter('comments_open', '__return_false', 20);
add_filter('pings_open', '__return_false', 20);
add_filter('wp_insert_post_data', function ($data) {
    $data['comment_status'] = 'closed';
    $data['ping_status'] = 'closed';
    return $data;
});
add_action('admin_menu', function () {
    foreach (['edit-comments.php', 'edit.php?post_type=page', 'link-manager.php'] as $menu) {
        remove_menu_page($menu);
    }
}, 99);

function cfw_gallery_ids($value) {
    $ids = is_array($value) ? $value : explode(',', (string) $value);
    return array_values(array_filter(array_unique(array_map('absint', $ids)), 'wp_attachment_is_image'));
}

add_action('add_meta_boxes', function () {
    add_meta_box('cfw_product_details', '产品规格与 SEO', 'cfw_details_box', CFW_PRODUCT);
    add_meta_box('cfw_article_pilot', 'Next.js 英文试点', 'cfw_details_box', 'post', 'side');
});

function cfw_details_box($post) {
    wp_nonce_field('cfw_save_details', 'cfw_details_nonce');
    if ($post->post_type === CFW_PRODUCT) {
        foreach (CFW_FIELDS as $key => $label) {
            $value = get_post_meta($post->ID, "cfw_$key", true);
            if ($key === 'gallery') {
                $value = implode(',', (array) $value);
            }
            printf('<p><label for="cfw_%1$s">%2$s</label><br><input class="widefat" id="cfw_%1$s" name="cfw_%1$s" value="%3$s"%4$s></p>',
                esc_attr($key), esc_html($label), esc_attr($value), $key === 'gallery' ? ' readonly' : '');
            if ($key === 'gallery') {
                echo '<p><button type="button" class="button" id="cfw-gallery-picker">从媒体库选择图片</button></p>';
            }
        }
    }
    printf('<label><input type="checkbox" name="cfw_next_pilot" value="1" %s> 同步到 Next.js 英文试点</label>',
        checked((bool) get_post_meta($post->ID, 'cfw_next_pilot', true), true, false));
}

add_action('admin_enqueue_scripts', function () {
    $screen = get_current_screen();
    if (!$screen || $screen->base !== 'post' || $screen->post_type !== CFW_PRODUCT) {
        return;
    }
    wp_enqueue_media();
    wp_enqueue_script('cfw-gallery', plugins_url('gallery.js', __FILE__), ['media-views'], '1.0.0', true);
});

add_action('save_post', function ($id, $post) {
    if (!in_array($post->post_type, ['post', CFW_PRODUCT], true)
        || !isset($_POST['cfw_details_nonce'])
        || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['cfw_details_nonce'])), 'cfw_save_details')
        || wp_is_post_revision($id) || wp_is_post_autosave($id)
        || !current_user_can('edit_post', $id)) {
        return;
    }
    update_post_meta($id, 'cfw_next_pilot', isset($_POST['cfw_next_pilot']));
    if ($post->post_type === CFW_PRODUCT) {
        foreach (CFW_FIELDS as $key => $label) {
            $value = wp_unslash($_POST["cfw_$key"] ?? '');
            update_post_meta($id, "cfw_$key", $key === 'gallery' ? cfw_gallery_ids($value) : sanitize_text_field($value));
        }
    }
}, 10, 2);

foreach (['post', CFW_PRODUCT] as $cfw_type) {
    add_filter("rest_{$cfw_type}_collection_params", function ($params) {
        $params['cfw_pilot'] = ['type' => 'boolean', 'default' => false];
        return $params;
    });
    add_filter("rest_{$cfw_type}_query", function ($args, $request) {
        if ($request['cfw_pilot']) {
            $pilot = ['key' => 'cfw_next_pilot', 'value' => '1'];
            $args['meta_query'] = empty($args['meta_query']) ? [$pilot] : [
                'relation' => 'AND', $args['meta_query'], $pilot,
            ];
        }
        return $args;
    }, 10, 2);
}

add_action('rest_api_init', function () {
    register_rest_field(CFW_PRODUCT, 'cfw_gallery_images', [
        'get_callback' => function ($product) {
            $images = [];
            foreach (cfw_gallery_ids(get_post_meta($product['id'], 'cfw_gallery', true)) as $id) {
                $source = wp_get_attachment_image_src($id, 'large');
                if (!$source || get_post_status($id) !== 'publish') {
                    continue;
                }
                $images[] = [
                    'url' => $source[0],
                    'width' => $source[1],
                    'height' => $source[2],
                    'alt' => get_post_meta($id, '_wp_attachment_image_alt', true),
                ];
            }
            return $images;
        },
    ]);
    register_rest_route('cfw/v1', '/revalidation', [
        'methods' => 'POST',
        'permission_callback' => function () { return current_user_can('manage_options'); },
        'args' => [
            'endpoint' => ['required' => true, 'type' => 'string', 'format' => 'uri'],
            'secret' => ['required' => true, 'type' => 'string', 'minLength' => 32, 'maxLength' => 128],
        ],
        'callback' => function ($request) {
            $endpoint = esc_url_raw($request['endpoint'], ['https']);
            if (!str_starts_with($endpoint, 'https://') || !wp_http_validate_url($endpoint)) {
                return new WP_Error('cfw_invalid_endpoint', 'A public HTTPS endpoint is required.', ['status' => 400]);
            }
            update_option('cfw_revalidation', [
                'endpoint' => $endpoint,
                'secret' => $request['secret'],
            ], false);
            return ['configured' => true];
        },
    ]);
});

function cfw_queue_revalidation($kind) {
    $GLOBALS['cfw_revalidation_events'][$kind] = true;
}

add_action('transition_post_status', function ($new, $old, $post) {
    if (($old === 'publish' || $new === 'publish') && in_array($post->post_type, ['post', CFW_PRODUCT], true)) {
        cfw_queue_revalidation($post->post_type === 'post' ? 'articles' : 'products');
    }
}, 10, 3);

add_action('before_delete_post', function ($id, $post) {
    if ($post->post_status === 'publish' && in_array($post->post_type, ['post', CFW_PRODUCT], true)) {
        cfw_queue_revalidation($post->post_type === 'post' ? 'articles' : 'products');
    }
}, 10, 2);

add_action('shutdown', function () {
    $events = $GLOBALS['cfw_revalidation_events'] ?? [];
    if (!$events) {
        return;
    }
    $config = get_option('cfw_revalidation');
    if (!$config) {
        return;
    }
    foreach (array_keys($events) as $kind) {
        $body = wp_json_encode(['kind' => $kind, 'timestamp' => time()]);
        wp_safe_remote_post($config['endpoint'], [
            'body' => $body,
            'headers' => [
                'Content-Type' => 'application/json',
                'X-CFW-Signature' => hash_hmac('sha256', $body, $config['secret']),
            ],
            'timeout' => 2,
            'redirection' => 0,
        ]);
    }
});
