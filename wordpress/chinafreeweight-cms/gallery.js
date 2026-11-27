document.addEventListener("click", (event) => {
  if (!event.target.closest("#cfw-gallery-picker")) return;
  const field = document.getElementById("cfw_gallery");
  if (!field) return;

  const picker = wp.media({ title: "选择产品图片", library: { type: "image" }, multiple: true });
  picker.on("open", () => {
    const selection = picker.state().get("selection");
    field.value.split(",").filter(Boolean).forEach((id) => {
      const attachment = wp.media.attachment(Number(id));
      attachment.fetch();
      selection.add(attachment);
    });
  });
  picker.on("select", () => {
    field.value = picker.state().get("selection").pluck("id").join(",");
  });
  picker.open();
});
