import type { BulletRead } from "../../../model/bullet-read";

export const createBulletNode = ({
  cx,
  cy,
  name,
  description,
  id,
  radarId,
  userId,
}: BulletRead): SVGCircleElement => {
  const stroke = "black";
  const cssClass = "bullet";
  const fill = "#065084";
  const r = "10px";

  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttribute("cx", cx.toString());
  circle.setAttribute("cy", cy.toString());
  circle.setAttribute("r", r);
  circle.setAttribute("fill", fill || "none");
  circle.setAttribute("stroke", stroke);
  circle.setAttribute("class", cssClass);
  circle.setAttribute("radar-id", radarId?.toString() || "");
  circle.setAttribute("user-id", userId?.toString() || "");
  circle.setAttribute("name", name);
  circle.setAttribute("description", description || "");
  circle.setAttribute("id", id?.toString() || "");

  return circle;
};
