import assert from "node:assert/strict";
import test from "node:test";

const { playSurfaceEntrance, revealSurfaceWrapper } = (await import(
  new URL("../src/lib/motion/SurfaceAnimation.ts", import.meta.url).href
)) as typeof import("../src/lib/motion/SurfaceAnimation");

function surfaceSpy() {
  const calls: {
    frames: Keyframe[] | PropertyIndexedKeyframes | null;
    options?: number | KeyframeAnimationOptions;
  }[] = [];
  const animation = {} as Animation;
  const surface = new Proxy<Pick<Element, "animate">>(
    {
      animate(frames, options) {
        calls.push({ frames, options });
        return animation;
      },
    },
    {
      get(target, key) {
        // Fail if presentation code starts touching dataset, classList, style,
        // setAttribute, or other React-owned HTML during streamed hydration.
        assert.equal(key, "animate");
        return target.animate;
      },
      set() {
        throw new Error("Animation must not mutate the hydrated element");
      },
    },
  );
  return { surface, calls, animation };
}

test("all entrance directions preserve HTML and the requested 900ms timing", () => {
  for (const [direction, translate] of [
    ["right", "-12px 0"],
    ["down", "0 -10px"],
    ["up", "0 12px"],
  ] as const) {
    const { surface, calls, animation } = surfaceSpy();
    assert.equal(playSurfaceEntrance(surface, direction), animation);
    assert.deepEqual(calls, [
      {
        frames: [{ opacity: 0, translate, offset: 0 }],
        options: {
          id: "surface-entrance",
          duration: 900,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          fill: "none",
        },
      },
    ]);
  }
});

test("legacy wrapper override also avoids data and inline style mutations", () => {
  const { surface, calls, animation } = surfaceSpy();
  assert.equal(revealSurfaceWrapper(surface), animation);
  assert.deepEqual(calls, [
    {
      frames: [{ opacity: 1, transform: "none" }],
      options: { id: "surface-wrapper", duration: 0, fill: "forwards" },
    },
  ]);
});
