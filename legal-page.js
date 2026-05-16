(() => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const snakesSvg = document.querySelector(".grid-snakes");
  const footer = document.querySelector(".site-footer");
  const footerTop = document.querySelector(".footer-top");
  const footerWaveTrack = document.querySelector(".footer-wave-track");
  const footerWaveSegments = [];
  let footerWaveFrame = null;
  let footerWaveScrollForce = 0;

  const updateHeader = () => {
    header.classList.toggle("site-header-compact", window.scrollY > 24);
  };

  const setMenuOpen = (isOpen) => {
    menuToggle.classList.toggle("menu-toggle-open", isOpen);
    mobileMenu.classList.toggle("mobile-menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  };

  menuToggle.addEventListener("click", () => {
    setMenuOpen(!mobileMenu.classList.contains("mobile-menu-open"));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  for (let index = 0; index < 23; index += 1) {
    const segment = document.createElement("div");
    segment.className = "footer-wave-segment";
    segment.style.height = `${index + 1}px`;
    footerWaveTrack.appendChild(segment);
    footerWaveSegments.push(segment);
  }

  const animateFooterWave = () => {
    let t = 0;
    const animate = () => {
      let offset = 0;
      footerWaveSegments.forEach((segment, index) => {
        offset += Math.max(0, (20 + footerWaveScrollForce) * Math.sin((t + index) * 0.3));
        segment.style.transform = `translateY(${index + offset}px)`;
      });
      footerWaveScrollForce *= 0.92;
      t += 0.05;
      footerWaveFrame = window.requestAnimationFrame(animate);
    };
    animate();
  };

  const stopFooterWave = () => {
    if (!footerWaveFrame) return;
    window.cancelAnimationFrame(footerWaveFrame);
    footerWaveFrame = null;
  };

  const footerObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        if (!footerWaveFrame) animateFooterWave();
      } else {
        stopFooterWave();
      }
    },
    { threshold: 0.2 }
  );
  footerObserver.observe(footer);

  footerTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });

  updateHeader();
  let previousScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    const delta = Math.abs(window.scrollY - previousScrollY);
    previousScrollY = window.scrollY;
    footerWaveScrollForce = Math.min(44, footerWaveScrollForce + delta * 0.12);
    updateHeader();
  }, { passive: true });

  const gridX = [
    32.5, 103.5, 118.5, 189.5, 205.5, 276.5, 292.5, 363.5, 379.5,
    450.5, 466.5, 537.5, 553.5, 624.5, 640.5, 711.5, 727.5, 798.5,
    814.5, 885.5, 901.5, 972.5, 988.5, 1059.5, 1075.5, 1146.5,
    1162.5, 1233.5, 1249.5, 1320.5, 1336.5, 1407.5,
  ];
  const gridY = [
    24.5, 69.5, 86.5, 132.5, 148.5, 193.5, 209.5, 256.5, 272.5,
    317.5, 334.5, 380.5, 396.5, 441.5, 457.5, 504.5, 520.5, 565.5,
    582.5, 628.5, 644.5, 689.5, 705.5, 752.5, 768.5, 813.5, 830.5,
    876.5, 892.5, 937.5, 953.5, 1000.5,
  ];
  const getGridOffsetX = () => (window.innerWidth - 1440) / 2;
  const pointToString = ([x, y]) => `${(x + getGridOffsetX()).toFixed(1)},${y.toFixed(1)}`;
  const routes = [
    [[gridX[0], gridY[7]], [gridX[6], gridY[7]], [gridX[6], gridY[10]], [gridX[13], gridY[10]], [gridX[13], gridY[16]], [gridX[21], gridY[16]], [gridX[21], gridY[21]], [gridX[31], gridY[21]]],
    [[gridX[31], gridY[19]], [gridX[26], gridY[19]], [gridX[26], gridY[14]], [gridX[18], gridY[14]], [gridX[18], gridY[9]], [gridX[10], gridY[9]], [gridX[10], gridY[4]], [gridX[1], gridY[4]]],
    [[gridX[16], gridY[15]], [gridX[20], gridY[15]], [gridX[20], gridY[22]], [gridX[24], gridY[22]], [gridX[24], gridY[27]], [gridX[14], gridY[27]], [gridX[14], gridY[18]], [gridX[8], gridY[18]], [gridX[8], gridY[25]]],
    [[gridX[3], gridY[2]], [gridX[8], gridY[2]], [gridX[8], gridY[8]], [gridX[15], gridY[8]], [gridX[15], gridY[13]], [gridX[22], gridY[13]], [gridX[22], gridY[18]]],
    [[gridX[30], gridY[5]], [gridX[25], gridY[5]], [gridX[25], gridY[11]], [gridX[17], gridY[11]], [gridX[17], gridY[17]], [gridX[11], gridY[17]], [gridX[11], gridY[23]]],
    [[gridX[12], gridY[30]], [gridX[18], gridY[30]], [gridX[18], gridY[24]], [gridX[23], gridY[24]], [gridX[23], gridY[20]], [gridX[29], gridY[20]], [gridX[29], gridY[15]]],
    [[gridX[0], gridY[28]], [gridX[5], gridY[28]], [gridX[5], gridY[24]], [gridX[9], gridY[24]], [gridX[9], gridY[19]], [gridX[16], gridY[19]], [gridX[16], gridY[12]]],
    [[gridX[31], gridY[29]], [gridX[27], gridY[29]], [gridX[27], gridY[25]], [gridX[19], gridY[25]], [gridX[19], gridY[21]], [gridX[12], gridY[21]], [gridX[12], gridY[14]]],
    [[gridX[15], gridY[0]], [gridX[15], gridY[6]], [gridX[20], gridY[6]], [gridX[20], gridY[12]], [gridX[28], gridY[12]], [gridX[28], gridY[17]], [gridX[23], gridY[17]]],
  ];
  const alignSnakesToGrid = () => {
    snakesSvg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
    snakesSvg.querySelectorAll(".grid-snake").forEach((path, index) => {
      path.setAttribute("points", routes[index].map(pointToString).join(" "));
    });
  };
  routes.forEach((route, index) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    path.classList.add("grid-snake", `grid-snake-${index + 1}`);
    path.setAttribute("points", route.map(pointToString).join(" "));
    snakesSvg.appendChild(path);
  });
  alignSnakesToGrid();
  window.addEventListener("resize", alignSnakesToGrid);
})();
