<!-- 
  Smooth scroller
  Just add any scrollable container inside this component.
  Dependencies:
  This example depends on GSAP to perform scroll y position across many browsers. It could
  be replaced by any function that resolves scroll position for all browsers to cover with.
  Taiwindcss classes has been used here too. It could be replaced with respective styles.
  Svelte component based on sample at:
  https://codepen.io/osublake/pen/QqPqbN
  MIT License
  Copyright (c) 2020 Jan Cassio
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
-->

<script>
  import { onMount } from "svelte";
  import gsap from "gsap";
  
  import App from "../App.svelte";
  import Index from "../pages/index.svelte";
  export let classes = "";
  // shortcut for DOM references
  let html;
  let body;
  let viewport;
  let target;
  // scroller params
  let friction = 0.1;
  let y = 0;
  // set needs update by changes
  let resizeRequest = 1;
  let scrollRequest = 0;
  // current on going animation request
  let requestId;
  function bodyResize() {
    const height = target.clientHeight;
    body.style.height = `${height}px`;
  }
  function resizeHeightIfNeeded() {
    const resized = resizeRequest > 0;
    if (resized) {
      bodyResize();
      resizeRequest = 0;
    }
    return resized;
  }
  function update() {
    const resized = resizeHeightIfNeeded();
    const scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;
    y += (scrollY - y) * friction;
    gsap.set(target, { y: -y });
    requestId = scrollRequest > 0 ? requestAnimationFrame(update) : null;
    scrollRequest--
  }
  function render() {
    requestId = requestAnimationFrame(update);
  }
  function onScroll(event) {
    scrollRequest++;
    if (!requestId) {
      render();
    }
  }
  function onResize(event) {
    resizeRequest++;
    if (!requestId) {
      render();
    }
  }
  onMount(() => {
    html = document.documentElement;
    body = document.body;
    gsap.config({ force3D: true });
    window.focus();
    window.addEventListener("resize", onResize);
    document.addEventListener("scroll", onScroll);
    document.addEventListener("wheel", onScroll);
    return () => {
      // dispose everything if this component been removed
      gsap.killTweensOf(target);
      cancelAnimationFrame(requestId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("scroll", onScroll);
      document.removeEventListener("wheel", onScroll);
    };
  });
</script>

<div class="relative">
  <div
    bind:this={viewport}
    class="viewport overflow-hidden fixed w-full h-full">
    <div bind:this={target} class={classes}>
      <slot />
    </div>
  </div>
</div>