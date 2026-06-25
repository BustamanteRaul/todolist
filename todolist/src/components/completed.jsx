import Sketch from "react-p5";

export default function CompletedChart({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pct = total === 0 ? 0 : completed / total;

  const setup = (p5, canvasParentRef) => {
    const w = 300;
    const h = 30;
    p5.createCanvas(w, h).parent(canvasParentRef);
    p5.noLoop();

    p5.fill(220);
    p5.noStroke();
    p5.rect(0, 0, w, h, 8);

    p5.fill(76, 175, 80);
    p5.rect(0, 0, w * pct, h, 8);

    p5.fill(0);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textSize(16);
    p5.text(`${completed} / ${total} completadas`, w / 2, h / 2);
  };

  const draw = () => {};

  return (
    <div style={{ margin: "12px 0" }}>
      <Sketch key={`${completed}-${total}`} setup={setup} draw={draw} />
    </div>
  );
}
