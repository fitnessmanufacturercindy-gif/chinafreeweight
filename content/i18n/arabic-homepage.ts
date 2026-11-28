import type {
  ContentBlock,
  ContentEntity,
  ContentManifest,
  LocalizedAuthor,
  LocalizedContentVersion,
  LocalizedFaq,
  LocalizedImage
} from "../../lib/content/types";

const publishedAt = "2026-11-28T02:00:00.000Z";

const arabicEditorialAuthor: LocalizedAuthor = {
  id: "powerbasefit-editorial-ar",
  name: "PowerBaseFit",
  kind: "Organization",
  role: "مصنّع معدات أوزان حرة"
};

const arabicTechnicalReviewer: LocalizedAuthor = {
  id: "powerbasefit-quality-ar",
  name: "فريق الإنتاج والجودة في PowerBaseFit",
  kind: "Organization",
  role: "مراجعة فنية للإنتاج وفحص الجودة"
};

const title = "مصنّع أوزان حرة ومعدات صالات تجارية | PowerBaseFit";
const description =
  "نصنّع الدمبل وأقراص الأثقال وأقراص البامبر وملحقات التدريب للمستوردين والموزعين ومشغّلي الصالات ومشاريع العلامة الخاصة. أرسل المواصفات والكميات ووجهة الشحن لطلب عرض سعر.";
const h1 = "مصنّع أوزان حرة للمشترين بالجملة ومشاريع الصالات التجارية";
const keyword = "مصنّع أوزان حرة";

function rich(id: string, heading: string, ...paragraphs: string[]): ContentBlock {
  return { id, type: "rich_text", heading, content: paragraphs.join("\n\n") };
}

function answer(id: string, heading: string, content: string): ContentBlock {
  return { id, type: "custom", heading, content, data: { component: "quick-answer" } };
}

function definition(id: string, term: string, content: string): ContentBlock {
  return { id, type: "custom", heading: "تعريف", content, data: { component: "definition", term } };
}

function table(id: string, heading: string, columns: string[], rows: string[][]): ContentBlock {
  return { id, type: "specifications", heading, data: { columns, rows } };
}

function checklist(id: string, heading: string, items: string[]): ContentBlock {
  return { id, type: "features", heading, data: { items } };
}

const images: LocalizedImage[] = [
  {
    id: "ar-home-1",
    src: "/assets/hero-poster.avif",
    alt: "منتجات أوزان حرة من PowerBaseFit للمشترين التجاريين",
    caption: "صورة قائمة من منتجات PowerBaseFit المستخدمة في مشاريع التوريد التجارية."
  },
  {
    id: "ar-home-2",
    src: "/assets/dumbbell-production.avif",
    alt: "مرحلة إنتاج حقيقية للدمبل في مصنع PowerBaseFit",
    caption: "مرحلة قائمة من عملية تصنيع الدمبل."
  },
  {
    id: "ar-home-3",
    src: "/assets/factory-cases/packaging-area-pbf.webp",
    alt: "تحضير تعبئة التصدير لمعدات الأوزان الحرة",
    caption: "تحضير قائم لتعبئة الشحن والتصدير."
  }
];

const faq: LocalizedFaq[] = [
  {
    id: "faq-1",
    question: "هل تعمل PowerBaseFit مع مشترين من فئة الشركات؟",
    answer:
      "نعم. الصفحة موجهة للمستوردين والموزعين ومشغّلي الصالات التجارية وأصحاب العلامات الخاصة الذين يحتاجون كميات ومواصفات واضحة، وليس للطلب الفردي بالقطعة."
  },
  {
    id: "faq-2",
    question: "هل يمكن تخصيص الشعار واللون والتعبئة؟",
    answer:
      "يمكن دراسة الشعار واللون ووسم الوزن والملصق والكرتون بحسب الطراز والكمية. تُؤكَّد الطريقة والموضع والملفات والحد الأدنى للطلب والعينة عند الحاجة قبل الإنتاج الكمي."
  },
  {
    id: "faq-3",
    question: "ما البيانات اللازمة للحصول على عرض سعر قابل للمقارنة؟",
    answer:
      "اسم الشركة، المنتجات والكميات لكل وزن أو طراز، بيئة الاستخدام، متطلبات التخصيص، التعبئة، بلد الوصول، شرط التسليم (Incoterm) إن وُجد، والجدول الزمني المطلوب."
  },
  {
    id: "faq-4",
    question: "هل يمكن تنظيم فحص قبل الشحن؟",
    answer:
      "نعم، عندما تُتفق معايير الفحص وطريقة أخذ العينات وتوقيته وصلاحية الوصول قبل الإنتاج. الفحص النهائي يكمّل ضبط العملية ولا يغني عنه."
  },
  {
    id: "faq-5",
    question: "من يتحقق من متطلبات الاستيراد في بلد الوجهة؟",
    answer:
      "المستورد أو الطرف المسؤول في سوق الوصول يتحقق من التصنيف الجمركي والرسوم والضرائب والالتزامات السارية على المنتج وطريقة عرضه. معلومات المصنّع مدخل للمناقشة، ولا تغني عن مراجعة محدّثة لدى الجهات المختصة."
  }
];

const body: ContentBlock[] = [
  answer(
    "ijaba",
    "إجابة مباشرة",
    "تقدّم PowerBaseFit تصنيع أوزان حرة ومعدات تدريب للمستوردين والموزعين ومشغّلي الصالات التجارية وأصحاب العلامات الخاصة. يبدأ العمل بتحديد الاستخدام والكميات والمواصفات وبلد الوصول، ثم دراسة الجدوى وعرض السعر والعينة عند الحاجة، فالإنتاج والفحص وتعبئة التصدير."
  ),
  definition(
    "tarif",
    keyword,
    "مصنّع أوزان حرة للمشترين من فئة الشركات لا يكتفي بعرض قطعة من الكتالوج. المطلوب هو تنفيذ مواصفة متفق عليها بشكل قابل للتكرار: بيانات المنتج، العينة، خيارات التخصيص، خطة الفحص، التعبئة، والمستندات اللازمة للشحن."
  ),
  rich(
    "barnamaj",
    "نطاق المنتجات",
    "يشمل البرنامج الدمبل المطاطي والبولي يوريثان (PU وTPU وCPU) والصلب والحديد الزهر، وأقراص الأثقال التقليدية وأقراص القبضة وأقراص البامبر، إضافة إلى ملحقات الكابل وأوزان الكيتل بيل وغيرها من ملحقات التدريب.",
    "يحدّد المشتري النماذج والكميات وفق مساحة الصالة أو خطة التوزيع أو مجموعة العلامة الخاصة، لا وفق قائمة عامة غير مرتبطة بالمشروع. تُراجع خطوط المنتجات التي يمكن الجمع بينها فنياً ولوجستياً قبل تثبيت عرض السعر."
  ),
  rich(
    "jumhur",
    "لمن هذه الصفحة",
    "يحتاج المستورد إلى بيانات واضحة للطراز والتعبئة وإعادة الطلب. يهتم الموزّع بتناسق المجموعة ووسم الأوزان واستمرارية التوريد. أما مشروع الصالة فيراعي الاستخدام والمساحة ومسار الحركة والصيانة. وتضيف العلامة الخاصة الشعار واللون والتعبئة ووثائق السوق.",
    "تختلف إجراءات الاستيراد ومتطلبات السوق بين بلد وآخر في المنطقة العربية. لذلك يصف عرض السعر نطاق التوريد المتفق عليه، ولا يحل محل مراجعة المشتري للالتزامات الجمركية والتنظيمية في سوق الوصول."
  ),
  table(
    "masar",
    "مسار توريد يمكن التحقق منه",
    ["المرحلة", "القرار", "النتيجة"],
    [
      ["الموجز", "الاستخدام والكميات والوجهة", "متطلبات أولية"],
      ["الجدوى", "المواد والمقاييس والتخصيص", "تكوين قابل للتسعير"],
      ["العينة", "المظهر والوظيفة والوسم", "مرجع معتمد"],
      ["الإنتاج", "العملية والفحوص المرحلية", "دفعة قابلة للتتبع"],
      ["الشحن", "الفحص والتعبئة والمستندات", "طلب جاهز للتسليم"]
    ]
  ),
  rich(
    "jawda",
    "الجودة والمتانة",
    "تُحدَّد الجودة قبل الطلب: الخصائص الحرجة، طريقة التحقق، أسلوب أخذ العينات، ومسؤولية كل طرف. أثناء الإنتاج تتبع الفحوص عائلة المنتج؛ وقبل الشحن تُقارن الدفعة بالمواصفة والمرجع المعتمد.",
    "لا تختصر المتانة في صفة تسويقية. فهي ترتبط بالمادة والإنشاء والتشطيب والحمل وتكرار الاستخدام والأرضية والتنظيف والصيانة. يجب أن يوضح عرض السعر الظروف التي اعتُمدت عند التقييم."
  ),
  rich(
    "oem",
    "التصنيع حسب الطلب والعلامة الخاصة",
    "يُقيَّم الشعار واللون ووسم الوزن والملصق والكرتون كنظام واحد. تُؤكَّد الطريقة والموضع والحجم والملفات الفنية والحد الأدنى للطلب، وتُعتمد عينة عند الحاجة، قبل الإنتاج الكمي.",
    "أي تعديل أعمق على الشكل أو المادة أو الإنشاء يُعامل كمشروع تطوير، ويتطلب وضوحاً في الرسوم والمسؤولية الفنية والاختبارات وإدارة المراجعات."
  ),
  checklist("qaema", "قبل إرسال طلب عرض السعر", [
    "تحديد نوع العميل وبيئة الاستخدام",
    "سرد المنتجات والكميات لكل وزن أو طراز",
    "ذكر المقاسات والأوزان والمواد الأساسية",
    "الفصل بين المتطلبات الإلزامية والتفضيلات",
    "إرفاق ملفات الشعار ودليل العلامة إن وُجد",
    "تحديد نوع العينة ومعيار اعتمادها",
    "توضيح التعبئة وبلد الوصول وشرط التسليم",
    "طلب الوزن الصافي والقائم والحجم",
    "الاتفاق على الفحوص ومعالجة عدم المطابقة",
    "حفظ رقم المراجعة والمرجع المعتمد لإعادة الطلب"
  ]),
  rich(
    "sar",
    "كيف تحصل على عرض سعر قابل للمقارنة",
    "لمقارنة موردين اطلب العرض على القاعدة نفسها: المنتج، الكمية، التخصيص، الفحص، التعبئة، نقطة التسليم، والتكاليف غير المشمولة. افصل التكاليف لمرة واحدة مثل العينة أو الأدوات عن سعر الوحدة.",
    "إذا نقص بيان مؤثر، يُفضَّل تسجيله كفرضية مفتوحة حتى يعرف المشتري ما قد يغيّر السعر أو الحد الأدنى للطلب أو مدة التصنيع قبل الاعتماد النهائي."
  ),
  rich(
    "istirad",
    "الاستيراد ومسؤولية السوق",
    "يتحقق المستورد من التصنيف الجمركي والقيمة والرسوم والضرائب والالتزامات السارية على المنتج وطريقة تسويقه. معلومات المصنّع تساعد على إعداد الملف، لكنها لا تغني عن تقييم محدّث لدى المختصين والجهات المختصة في بلد الوصول.",
    "حدّد بلد طرح المنتج في الموجز منذ البداية، ولا تعامل أسواقاً مختلفة كسيناريو إداري واحد."
  ),
  {
    id: "khutwa",
    type: "custom",
    heading: "الخطوة التالية",
    data: {
      component: "markdown-section",
      markdown:
        "أرسل اسم الشركة والمنتجات والكميات التقريبية ومستوى التخصيص وبلد الوصول والتاريخ المستهدف. يمكن حينها تحديد ما يؤثر في الجدوى والحد الأدنى للطلب والعينة والفحص والتسليم.\n\nصفحات المنتجات والمصنع والتصنيع حسب الطلب ونموذج التواصل متوفرة أيضاً بالإنجليزية:\n\n- [كتالوج المنتجات](/products)\n- [المصنع وضبط الجودة](/factory)\n- [التصنيع حسب الطلب والعلامة الخاصة](/oem)\n- [إرسال طلب عرض سعر](/contact)"
    }
  },
  {
    id: "talab",
    type: "custom",
    heading: "أرسل بيانات المشروع",
    data: { component: "inquiry-form" }
  }
];

function arabicHomeVersion(): LocalizedContentVersion {
  return {
    locale: "ar",
    translationStatus: "localized",
    reviewStatus: "approved",
    publishStatus: "published",
    slug: "ar",
    publicPath: "/ar",
    title,
    description,
    h1,
    body,
    faq,
    author: arabicEditorialAuthor,
    reviewedBy: arabicTechnicalReviewer,
    schemaData: {
      brand: "PowerBaseFit",
      manufacturer: "PowerBaseFit",
      category: keyword,
      breadcrumbs: [{ name: "الرئيسية", path: "/ar" }],
      extra: {
        primaryKeyword: keyword,
        searchIntent: "تقييم المصنّع وطلب عرض سعر",
        contactPath: "/contact"
      }
    },
    images,
    internalLinks: [
      { targetContentId: "case-compact-chrome-dumbbell-set", label: "حالة مجموعة دمبل كروم مدمجة" },
      { targetContentId: "case-custom-logo-fitness-chain-strength-equipment", label: "حالة شعار مخصص لمعدات القوة" },
      { targetContentId: "bulk-oem-steel-dumbbells-guide", label: "دليل شراء دمبل الصلب بالجملة" },
      { targetContentId: "commercial-olympic-barbell-buying-guide", label: "دليل اختيار القضيب الأولمبي للصالات" },
      { targetContentId: "wholesale-free-weight-incoterms-import-guide", label: "دليل شروط التسليم لاستيراد الأوزان الحرة" }
    ],
    canonicalData: { mode: "self" },
    hreflangData: { include: true },
    updatedAt: publishedAt,
    publishedAt,
    version: 1
  };
}

function retargetArabicHomeBreadcrumbs(manifest: ContentManifest): ContentManifest {
  return {
    ...manifest,
    entities: manifest.entities.map((entity) => ({
      ...entity,
      versions: Object.fromEntries(
        Object.entries(entity.versions).map(([locale, version]) => {
          if (locale !== "ar" || !version?.schemaData.breadcrumbs?.length) return [locale, version];
          const breadcrumbs = version.schemaData.breadcrumbs.map((crumb, index) =>
            index === 0 && crumb.path === "/" ? { ...crumb, path: "/ar" } : crumb
          );
          return [locale, { ...version, schemaData: { ...version.schemaData, breadcrumbs } }];
        })
      ) as ContentEntity["versions"]
    }))
  };
}

export function withArabicHomepage(manifest: ContentManifest): ContentManifest {
  const entities = manifest.entities.map((entity) => {
    if (entity.id !== "home") return entity;
    if (entity.versions.ar) throw new Error("Arabic homepage already exists on the home entity");
    return { ...entity, versions: { ...entity.versions, ar: arabicHomeVersion() } };
  });
  if (!entities.some((entity) => entity.id === "home" && entity.versions.ar)) {
    throw new Error("Arabic homepage could not be attached because the home entity is missing");
  }
  return retargetArabicHomeBreadcrumbs({ ...manifest, entities });
}
