
/* Security Engineering Lab — site.js */

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
        subtitle: "CLOUD & ENTERPRISE SECURITY",
        title: "Design. Build. Secure.",
        intro: "클라우드 보안과 기업 인프라 보안을 중심으로 기술을 학습하고 직접 구축·검증한 과정을 기록하는 개인 엔지니어링 랩입니다.",
        focus: "주요 기술 분야",
        current: "Current Experience",
        career: "CNAPP 솔루션 구축, PoC, 고객 기술지원, 트러블슈팅 및 테스트 환경 검증",
        explore: "Explore the Lab"
      },
      profile: {
        intro: "Cloud Security · Multi-Cloud · Infrastructure Security",
        experience: "Experience",
        current: "현재",
        company: "회사 및 재직 기간 추후 기재",
        tasks: [
          "CNAPP 솔루션 구축 및 고객사 기술지원",
          "PoC 환경 구성 및 기능 검증",
          "트러블슈팅 및 테스트 환경 구축·재현"
        ],
        skills: "Technical Skills",
        certs: "Certifications",
        education: "Education",
        training: "Training",
        trainingNote: "관련 교육 이력은 상세 정보 확인 후 추가"
      },
      projects: {
        intro: "직접 설계, 구현, 검증한 엔지니어링 결과물을 정리합니다.",
        empty: "프로젝트 준비 중",
        detail: "완성된 프로젝트의 아키텍처, 구현 과정 및 검증 결과를 게시할 예정입니다."
      },
      studies: {
        intro: "이론, 실습, 기술 분석, 트러블슈팅과 보안 점검 기록을 정리하는 기술 블로그입니다.",
        empty: "스터디 게시물 준비 중",
        detail: "기술 문서를 추가하면 유형과 기술 태그별로 탐색할 수 있습니다.",
        filters: [
          "전체", "이론", "실습",
          "리서치", "트러블슈팅", "플레이북"
        ]
      },
      university: {
        intro: "대학 시절 수행한 개인, 팀 및 졸업 프로젝트를 정리합니다.",
        empty: "대학 프로젝트 정리 중",
        detail: "프로젝트명, 수행 기간, 담당 역할, 기술 및 결과물을 추가할 예정입니다."
      }
    },

    en: {
      home: {
        subtitle: "CLOUD & ENTERPRISE SECURITY",
        title: "Design. Build. Secure.",
        intro: "A personal engineering lab documenting cloud and enterprise security studies, implementations, and hands-on validation.",
        focus: "Focus Areas",
        current: "Current Experience",
        career: "CNAPP deployment, PoC, technical support, troubleshooting, and test environment validation",
        explore: "Explore the Lab"
      },
      profile: {
        intro: "Cloud Security · Multi-Cloud · Infrastructure Security",
        experience: "Experience",
        current: "Present",
        company: "Company and employment dates to be added",
        tasks: [
          "CNAPP deployment and customer technical support",
          "PoC environment setup and validation",
          "Troubleshooting and issue reproduction in test environments"
        ],
        skills: "Technical Skills",
        certs: "Certifications",
        education: "Education",
        training: "Training",
        trainingNote: "Training details will be added after confirmation."
      },
      projects: {
        intro: "Engineering projects focused on implementation and technical validation.",
        empty: "Projects in preparation",
        detail: "Project architecture, implementation, and validation results will be published here."
      },
      studies: {
        intro: "A technical archive covering concepts, hands-on labs, research, troubleshooting, and security reviews.",
        empty: "Study posts in preparation",
        detail: "Posts will be searchable by category and technology tags.",
        filters: [
          "All", "Theory", "Hands-on",
          "Research", "Troubleshooting", "Playbooks"
        ]
      },
      university: {
        intro: "An archive of academic, team, and personal development projects.",
        empty: "Academic projects in preparation",
        detail: "Project descriptions, responsibilities, technologies, and outcomes will be added."
      }
    }
  };

  const skills = {
    "Cloud Platforms": [
      "AWS", "Microsoft Azure", "Google Cloud"
    ],
    "Cloud Security": [
      "Wiz", "CNAPP"
    ],
    "Infrastructure & IaC": [
      "Kubernetes", "Linux", "Terraform"
    ],
    "Programming": [
      "Python", "C"
    ]
  };

  const tags = [
    "AWS", "Azure", "GCP", "Multi-Cloud",
    "IAM", "CNAPP", "Kubernetes",
    "Linux", "Terraform", "Python"
  ];

  const page = document.body.dataset.page || "home";
  const currentPage = pages.some(p => p[0] === page)
    ? page : "home";

  const root = document.getElementById("app");
  if (!root) return;

  let lang = "ko";

  try {
    lang = localStorage.getItem("lab-language") === "en"
      ? "en" : "ko";
  } catch (_) {}

  function renderTags(items) {
    return `
      <div class="tags">
        ${items.map(item =>
          `<span class="tag">${item}</span>`
        ).join("")}
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
    const index = lang === "ko" ? 2 : 3;

    return `
      <header class="site-header">
        <nav class="nav-container">
          <a class="site-logo" href="index.html">
            Security Engineering Lab
          </a>

          <div class="nav-links">
            ${pages.map(p => `
              <a href="${p[1]}"
                 class="nav-link ${p[0] === currentPage
                   ? "active" : ""}"
                 ${p[0] === currentPage
                   ? 'aria-current="page"' : ""}>
                ${p[index]}
              </a>
            `).join("")}

            <button id="lang-toggle"
                    class="language-toggle"
                    type="button">
              ${lang === "ko" ? "KO → EN" : "EN → KO"}
            </button>
          </div>
        </nav>
      </header>
    `;
  }

  function home() {
    const t = content[lang].home;
    const ko = lang === "ko";

    return `
      <main>
        <section class="hero">
          <div class="container">
            <span class="eyebrow">${t.subtitle}</span>

            <h1 class="hero-title">
              Design. Build.
              <span class="accent">Secure.</span>
            </h1>

            <p class="hero-description">${t.intro}</p>

            <div class="button-group">
              <a class="button button-primary"
                 href="projects.html">
                ${ko ? "프로젝트 보기" : "View Projects"}
              </a>
              <a class="button button-secondary"
                 href="studies.html">
                ${ko ? "스터디 보기" : "Explore Studies"}
              </a>
            </div>
          </div>
        </section>

        ${section(t.focus, renderTags(tags))}

        ${section(t.current, `
          <div class="card">
            <h3 class="card-title">
              CNAPP Solution Engineer
            </h3>
            <p class="card-description">${t.career}</p>
            <a class="card-link" href="profile.html">
              ${ko ? "프로필 보기 →" : "View Profile →"}
            </a>
          </div>
        `)}

        ${section(t.explore, `
          <div class="grid">
            ${[
              ["Projects", "projects.html",
                ko ? "엔지니어링 결과물"
                   : "Engineering work"],
              ["Studies", "studies.html",
                ko ? "기술 스터디 및 실습"
                   : "Technical notes and labs"],
              ["University", "university.html",
                ko ? "대학 시절 프로젝트"
                   : "Academic projects"]
            ].map(item => `
              <a class="card" href="${item[1]}">
                <h3 class="card-title">${item[0]} →</h3>
                <p class="card-description">${item[2]}</p>
              </a>
            `).join("")}
          </div>
        `)}
      </main>
    `;
  }

  function profile() {
    const t = content[lang].profile;

    const skillRows = Object.entries(skills)
      .map(([category, items]) => `
        <div class="skill-group">
          <span class="skill-label">${category}</span>
          ${renderTags(items)}
        </div>
      `).join("");

    const university = lang === "ko"
      ? "상명대학교 천안캠퍼스 · 정보보안공학"
      : "Sangmyung University (Cheonan) · Information Security Engineering";

    const college = lang === "ko"
      ? "동양미래대학교 · 자동화공학"
      : "Dongyang Mirae University · Automation Engineering";

    return `
      <main>
        <div class="container">

          <div class="profile-intro">
            <span class="eyebrow">
              PROFESSIONAL PROFILE
            </span>
            <h1 class="profile-name">Suah</h1>
            <p class="profile-role">
              CNAPP Solution Engineer
            </p>
            <p class="profile-description">
              ${t.intro}
            </p>
          </div>

          <section class="profile-section">
            <h2>${t.experience}</h2>

            <div class="timeline-item">
              <div class="timeline-date">${t.current}</div>

              <div class="timeline-content">
                <h3>CNAPP Solution Engineer</h3>
                <div class="timeline-company">
                  ${t.company}
                </div>

                <ul class="timeline-list">
                  ${t.tasks.map(task =>
                    `<li>${task}</li>`
                  ).join("")}
                </ul>

                ${renderTags([
                  "CNAPP", "Deployment", "PoC",
                  "Troubleshooting", "Validation"
                ])}
              </div>
            </div>
          </section>

          <section class="profile-section">
            <h2>${t.skills}</h2>
            ${skillRows}
          </section>

          <section class="profile-section">
            <h2>${t.certs}</h2>

            <div class="info-item">
              <div>
                <div class="info-title">
                  Microsoft Certified:
                  Security Operations Analyst Associate
                </div>
                <div class="info-detail">
                  SC-200 · Microsoft
                </div>
              </div>
              <div class="info-date">2026.02</div>
            </div>
          </section>

          <section class="profile-section">
            <h2>${t.education}</h2>

            <div class="info-item">
              <div class="info-title">${university}</div>
              <div class="info-date">2025.08</div>
            </div>

            <div class="info-item">
              <div class="info-title">${college}</div>
              <div class="info-date">2023.02</div>
            </div>
          </section>

          <section class="profile-section">
            <h2>${t.training}</h2>
            <p class="section-description">
              ${t.trainingNote}
            </p>
          </section>

        </div>
      </main>
    `;
  }

  function projects() {
    const t = content[lang].projects;

    return `
      <main>
        <section class="hero">
          <div class="container">
            <span class="eyebrow">ENGINEERING WORK</span>
            <h1 class="hero-title">Projects</h1>
            <p class="hero-description">${t.intro}</p>
          </div>
        </section>

        ${section("", emptyState(t.empty, t.detail))}
      </main>
    `;
  }

  function studies() {
    const t = content[lang].studies;

    return `
      <main>
        <section class="hero">
          <div class="container">
            <span class="eyebrow">TECHNICAL ARCHIVE</span>
            <h1 class="hero-title">Studies</h1>
            <p class="hero-description">${t.intro}</p>
          </div>
        </section>

        <section class="section">
          <div class="container">
            <div class="filter-bar">
              ${t.filters.map((filter, index) => `
                <button class="filter-button
                  ${index === 0 ? "active" : ""}"
                  type="button"
                  data-filter="${index}"
                  aria-pressed="${index === 0}">
                  ${filter}
                </button>
              `).join("")}
            </div>

            ${emptyState(t.empty, t.detail)}
          </div>
        </section>

        ${section("Topics", renderTags(tags))}
      </main>
    `;
  }

  function university() {
    const t = content[lang].university;

    return `
      <main>
        <section class="hero">
          <div class="container">
            <span class="eyebrow">ACADEMIC ARCHIVE</span>
            <h1 class="hero-title">University</h1>
            <p class="hero-description">${t.intro}</p>
          </div>
        </section>

        ${section("", emptyState(t.empty, t.detail))}
      </main>
    `;
  }

  function footer() {
    return `
      <footer class="site-footer">
        <div class="container footer-inner">
          <span>© 2026 Security Engineering Lab · Suah</span>
          <span>
            ${lang === "ko"
              ? "Personal Engineering Archive"
              : "Personal Engineering Archive"}
          </span>
        </div>
      </footer>
    `;
  }

  function render() {
    document.documentElement.lang = lang;

    const current = pages.find(p => p[0] === currentPage);
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
      header() + views[currentPage]() + footer();

    document
      .getElementById("lang-toggle")
      .addEventListener("click", () => {
        lang = lang === "ko" ? "en" : "ko";

        try {
          localStorage.setItem("lab-language", lang);
        } catch (_) {}

        render();
      });

    document.querySelectorAll("[data-filter]")
      .forEach(button => {
        button.addEventListener("click", () => {
          document.querySelectorAll("[data-filter]")
            .forEach(item => {
              item.classList.remove("active");
              item.setAttribute("aria-pressed", "false");
            });

          button.classList.add("active");
          button.setAttribute("aria-pressed", "true");
        });
      });
  }

  render();
})();
