
/*
 * Security Engineering Lab
 * Public Website — structure-v2
 *
 * Profile details are maintained separately
 * in a private repository.
 */

(() => {
  "use strict";

  const pages = [
    ["home", "index.html", "홈", "Home"],
    ["profile", "profile.html", "프로필", "Profile"],
    ["projects", "projects.html", "프로젝트", "Projects"],
    ["studies", "studies.html", "스터디", "Studies"],
    ["university", "university.html", "대학 시절", "University"]
  ];

  const content = {
    ko: {
      home: {
        subtitle: "SECURITY ENGINEERING LAB",
        intro:
          "클라우드 및 인프라 보안을 중심으로 기술 이론, 실습, 프로젝트와 문제 해결 과정을 기록하는 개인 기술 연구실입니다.",
        focus: "Focus Areas",
        explore: "Explore the Lab",
        archive: "Technical Archive",
        archiveDesc:
          "보안 기술을 학습하고 실습 환경에서 검증한 내용을 지속적으로 정리합니다."
      },

      profile: {
        title: "Profile",
        subtitle: "PRIVATE PROFILE",
        description:
          "프로필 정보는 현재 비공개로 관리하고 있습니다.",
        detail:
          "기술 프로젝트와 스터디 기록은 공개되어 있습니다."
      },

      projects: {
        title: "Projects",
        subtitle: "ENGINEERING WORK",
        description:
          "직접 설계하고 구현한 엔지니어링 프로젝트와 검증 결과를 정리합니다.",
        empty: "프로젝트 준비 중",
        detail:
          "프로젝트 아키텍처, 구현 과정 및 검증 결과가 순차적으로 게시될 예정입니다."
      },

      studies: {
        title: "Studies",
        subtitle: "TECHNICAL ARCHIVE",
        description:
          "기술 이론, 실습, 리서치, 트러블슈팅 및 보안 점검 내용을 기록합니다.",
        empty: "스터디 게시물 준비 중",
        detail:
          "기술 문서는 주제와 유형에 따라 분류하여 게시할 예정입니다.",
        filters: [
          "전체",
          "이론",
          "실습",
          "리서치",
          "트러블슈팅",
          "플레이북"
        ]
      },

      university: {
        title: "University",
        subtitle: "ACADEMIC PROJECTS",
        description:
          "대학 시절 수행한 개발 및 엔지니어링 프로젝트를 정리하는 공간입니다.",
        empty: "대학 프로젝트 정리 중",
        detail:
          "프로젝트별 사용 기술, 구현 내용 및 결과물을 추가할 예정입니다."
      }
    },

    en: {
      home: {
        subtitle: "SECURITY ENGINEERING LAB",
        intro:
          "A personal technical lab documenting cloud and infrastructure security studies, hands-on experiments, engineering projects, and technical problem-solving.",
        focus: "Focus Areas",
        explore: "Explore the Lab",
        archive: "Technical Archive",
        archiveDesc:
          "An evolving archive of security research, practical implementations, and technical validation."
      },

      profile: {
        title: "Profile",
        subtitle: "PRIVATE PROFILE",
        description:
          "Professional profile details are currently maintained privately.",
        detail:
          "Engineering projects and technical studies remain publicly available."
      },

      projects: {
        title: "Projects",
        subtitle: "ENGINEERING WORK",
        description:
          "Engineering projects focused on practical implementation and technical validation.",
        empty: "Projects in Preparation",
        detail:
          "Architecture, implementation details, and validation results will be published here."
      },

      studies: {
        title: "Studies",
        subtitle: "TECHNICAL ARCHIVE",
        description:
          "A technical archive covering concepts, hands-on labs, research, troubleshooting, and security reviews.",
        empty: "Study Posts in Preparation",
        detail:
          "Technical documents will be organized by topic and content type.",
        filters: [
          "All",
          "Theory",
          "Hands-on",
          "Research",
          "Troubleshooting",
          "Playbooks"
        ]
      },

      university: {
        title: "University",
        subtitle: "ACADEMIC PROJECTS",
        description:
          "An archive of academic engineering and development projects.",
        empty: "Academic Projects in Preparation",
        detail:
          "Project technologies, implementations, and outcomes will be added."
      }
    }
  };

  /*
   * Public technology topics.
   * These represent areas covered by the lab,
   * not individual proficiency claims.
   */

  const focusAreas = [
    "AWS",
    "Microsoft Azure",
    "Google Cloud",
    "Multi-Cloud Security",
    "IAM",
    "Network Security",
    "Linux",
    "Kubernetes",
    "Terraform",
    "Security Automation"
  ];

  const page =
    document.body.dataset.page || "home";

  const currentPage = pages.some(
    item => item[0] === page
  ) ? page : "home";

  const root =
    document.getElementById("app");

  if (!root) return;

  let lang = "ko";

  try {
    lang = localStorage.getItem("lab-language") === "en"
      ? "en"
      : "ko";
  } catch (_) {
    lang = "ko";
  }

  /* Shared UI */

  function renderTags(items) {
    return `
      <div class="tags">
        ${items.map(item => `
          <span class="tag">${item}</span>
        `).join("")}
      </div>
    `;
  }

  function section(title, body) {
    return `
      <section class="section">
        <div class="container">
          ${title
            ? `<h2 class="section-title">${title}</h2>`
            : ""}
          ${body}
        </div>
      </section>
    `;
  }

  function emptyState(title, description) {
    return `
      <div class="empty-state">
        <h3>${title}</h3>
        <p>${description}</p>
      </div>
    `;
  }

  function header() {
    const languageIndex =
      lang === "ko" ? 2 : 3;

    return `
      <header class="site-header">
        <nav class="nav-container">

          <a class="site-logo" href="index.html">
            Security Engineering Lab
          </a>

          <div class="nav-links">
            ${pages.map(item => `
              <a
                href="${item[1]}"
                class="nav-link ${
                  item[0] === currentPage
                    ? "active"
                    : ""
                }"
                ${
                  item[0] === currentPage
                    ? 'aria-current="page"'
                    : ""
                }
              >
                ${item[languageIndex]}
              </a>
            `).join("")}

            <button
              id="lang-toggle"
              class="language-toggle"
              type="button"
              aria-label="Change language"
            >
              ${lang === "ko" ? "KO → EN" : "EN → KO"}
            </button>
          </div>
        </nav>
      </header>
    `;
  }

  /* Home */

  function home() {
    const t = content[lang].home;
    const ko = lang === "ko";

    const areas = [
      {
        name: "Projects",
        url: "projects.html",
        description: ko
          ? "엔지니어링 프로젝트와 구현 결과물"
          : "Engineering projects and implementations"
      },
      {
        name: "Studies",
        url: "studies.html",
        description: ko
          ? "기술 이론, 실습 및 트러블슈팅"
          : "Technical studies, labs, and troubleshooting"
      },
      {
        name: "University",
        url: "university.html",
        description: ko
          ? "대학 시절 개발 및 프로젝트 기록"
          : "Academic development and project archive"
      }
    ];

    return `
      <main>
        <section class="hero">
          <div class="container">

            <span class="eyebrow">
              ${t.subtitle}
            </span>

            <h1 class="hero-title">
              Design. Build.
              <span class="accent">Secure.</span>
            </h1>

            <p class="hero-description">
              ${t.intro}
            </p>

            <div class="button-group">
              <a
                href="projects.html"
                class="button button-primary"
              >
                ${ko ? "프로젝트 보기" : "View Projects"}
              </a>

              <a
                href="studies.html"
                class="button button-secondary"
              >
                ${ko ? "스터디 보기" : "Explore Studies"}
              </a>
            </div>

          </div>
        </section>

        ${section(
          t.focus,
          renderTags(focusAreas)
        )}

        ${section(
          t.archive,
          `
          <p class="section-description">
            ${t.archiveDesc}
          </p>
          `
        )}

        ${section(
          t.explore,
          `
          <div class="grid">
            ${areas.map(item => `
              <a class="card" href="${item.url}">
                <h3 class="card-title">
                  ${item.name} →
                </h3>
                <p class="card-description">
                  ${item.description}
                </p>
              </a>
            `).join("")}
          </div>
          `
        )}
      </main>
    `;
  }

  /* Private Profile Placeholder */

  function profile() {
    const t = content[lang].profile;
    const ko = lang === "ko";

    return `
      <main>
        <section class="hero">
          <div class="container">

            <span class="eyebrow">
              ${t.subtitle}
            </span>

            <h1 class="hero-title">
              ${t.title}
            </h1>

            <p class="hero-description">
              ${t.description}
            </p>

            <p class="section-description">
              ${t.detail}
            </p>

            <div class="button-group" style="margin-top:32px">

              <a
                href="projects.html"
                class="button button-primary"
              >
                ${ko ? "프로젝트 보기" : "View Projects"}
              </a>

              <a
                href="studies.html"
                class="button button-secondary"
              >
                ${ko ? "스터디 보기" : "View Studies"}
              </a>

            </div>
          </div>
        </section>
      </main>
    `;
  }

  /* Projects */

  function projects() {
    const t = content[lang].projects;

    return `
      <main>
        <section class="hero">
          <div class="container">
            <span class="eyebrow">
              ${t.subtitle}
            </span>

            <h1 class="hero-title">
              ${t.title}
            </h1>

            <p class="hero-description">
              ${t.description}
            </p>
          </div>
        </section>

        ${section(
          "",
          emptyState(t.empty, t.detail)
        )}
      </main>
    `;
  }

  /* Studies */

  function studies() {
    const t = content[lang].studies;

    return `
      <main>
        <section class="hero">
          <div class="container">
            <span class="eyebrow">
              ${t.subtitle}
            </span>

            <h1 class="hero-title">
              ${t.title}
            </h1>

            <p class="hero-description">
              ${t.description}
            </p>
          </div>
        </section>

        <section class="section">
          <div class="container">

            <div class="filter-bar">
              ${t.filters.map((filter, index) => `
                <button
                  class="filter-button ${
                    index === 0 ? "active" : ""
                  }"
                  data-filter="${index}"
                  type="button"
                  aria-pressed="${index === 0}"
                >
                  ${filter}
                </button>
              `).join("")}
            </div>

            ${emptyState(t.empty, t.detail)}

          </div>
        </section>

        ${section(
          "Topics",
          renderTags(focusAreas)
        )}
      </main>
    `;
  }

  /* University */

  function university() {
    const t = content[lang].university;

    return `
      <main>
        <section class="hero">
          <div class="container">
            <span class="eyebrow">
              ${t.subtitle}
            </span>

            <h1 class="hero-title">
              ${t.title}
            </h1>

            <p class="hero-description">
              ${t.description}
            </p>
          </div>
        </section>

        ${section(
          "",
          emptyState(t.empty, t.detail)
        )}
      </main>
    `;
  }

  /* Footer */

  function footer() {
    return `
      <footer class="site-footer">
        <div class="container footer-inner">
          <span>
            © 2026 Security Engineering Lab
          </span>

          <span>
            Personal Engineering Archive
          </span>
        </div>
      </footer>
    `;
  }

  /* Render */

  function render() {
    document.documentElement.lang = lang;

    const current = pages.find(
      item => item[0] === currentPage
    );

    document.title =
      `${current[lang === "ko" ? 2 : 3]} | Security Engineering Lab`;

    const views = {
      home,
      profile,
      projects,
      studies,
      university
    };

    root.innerHTML =
      header() +
      views[currentPage]() +
      footer();

    const toggle =
      document.getElementById("lang-toggle");

    toggle.addEventListener("click", () => {
      lang = lang === "ko" ? "en" : "ko";

      try {
        localStorage.setItem(
          "lab-language",
          lang
        );
      } catch (_) {}

      render();
    });

    document.querySelectorAll("[data-filter]")
      .forEach(button => {
        button.addEventListener("click", () => {
          document.querySelectorAll("[data-filter]")
            .forEach(item => {
              item.classList.remove("active");
              item.setAttribute(
                "aria-pressed",
                "false"
              );
            });

          button.classList.add("active");
          button.setAttribute(
            "aria-pressed",
            "true"
          );
        });
      });
  }

  render();
})();
