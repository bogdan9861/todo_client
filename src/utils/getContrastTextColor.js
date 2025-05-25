export const getContrastTextColor = (color = "", colorVariants) => {
  let r, g, b;

  if (color.startsWith("#")) {
    color = color.slice(1);

    if (color?.length === 3) {
      r = parseInt(color[0] + color[0], 16);
      g = parseInt(color[1] + color[1], 16);
      b = parseInt(color[2] + color[2], 16);
    } else if (color.length === 6) {
      r = parseInt(color.slice(0, 2), 16);
      g = parseInt(color.slice(2, 4), 16);
      b = parseInt(color.slice(4, 6), 16);
    } else {
      throw new Error("Некорректный формат цвета");
    }
  } else if (color?.startsWith("rgb")) {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!match) throw new Error("Некорректный формат цвета");
    r = parseInt(match[1], 10);
    g = parseInt(match[2], 10);
    b = parseInt(match[3], 10);
  } else {
    console.log("error");
  }

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness < 128
    ? colorVariants?.bright || "#fff"
    : colorVariants?.dark || "#000";
};
