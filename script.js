
function setLanguage(lang) {
  const t = translations[lang];
  // Navbar
  const navAbout = document.getElementById("nav-about");
  if (navAbout) navAbout.innerText = t.nav_about;
  const navEducation = document.getElementById("nav-education");
  if (navEducation) navEducation.innerText = t.nav_education;
  const navExperience = document.getElementById("nav-experience");
  if (navExperience) navExperience.innerText = t.nav_experience;
  const navProjects = document.getElementById("nav-projects");
  if (navProjects) navProjects.innerText = t.nav_projects;
  const navSkills = document.getElementById("nav-skills");
  if (navSkills) navSkills.innerText = t.nav_skills;
  const navContact = document.getElementById("nav-contact");
  if (navContact) navContact.innerText = t.nav_contact;

  // Header
  const headerTitle = document.getElementById("header-title");
  if (headerTitle) headerTitle.innerText = t.header_title;
  const headerRole = document.getElementById("header-role");
  if (headerRole) headerRole.innerText = t.header_role;

  // About
  const aboutTitle = document.getElementById("about-title");
  if (aboutTitle) aboutTitle.innerText = t.about_title;
  const aboutText = document.getElementById("about-text");
  if (aboutText) aboutText.innerText = t.about_text;

  // Education
  const educationTitle = document.getElementById("education-title");
  if (educationTitle) educationTitle.innerText = t.education_title;
  const eduList = document.getElementById("education-list");
  if (eduList) {
    eduList.innerHTML = "";
    t.education_list.forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;
      eduList.appendChild(li);
    });
  }

  // Experience
  const experienceTitle = document.getElementById("experience-title");
  if (experienceTitle) experienceTitle.innerText = t.experience_title;
  // You can add more experience translation logic here if needed

  // Projects
  const projectsTitle = document.getElementById("projects-title");
  if (projectsTitle) projectsTitle.innerText = t.projects_title;
  const projectTitle = document.getElementById("project-title");
  if (projectTitle) projectTitle.innerText = t.projects_title;
  const projectDesc = document.getElementById("project-desc");
  if (projectDesc) projectDesc.innerText = t.projects_desc;
  const projectBullets = document.getElementById("project-bullets");
  if (projectBullets && t.project_bullets) {
    projectBullets.innerHTML = "";
    t.project_bullets.forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;
      projectBullets.appendChild(li);
    });
  }

  // Skills
  const skillsTitle = document.getElementById("skills-title");
  if (skillsTitle) skillsTitle.innerText = t.skills_title;
  const skillsList = document.getElementById("skills-list");
  if (skillsList) {
    skillsList.innerHTML = "";
    t.skills_list.forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;
      skillsList.appendChild(li);
    });
  }
  const awardsList = document.getElementById("awards-list");
  if (awardsList) {
    awardsList.innerHTML = "";
    t.awards_list.forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;
      awardsList.appendChild(li);
    });
  }

  // Contact
  const contactTitle = document.getElementById("contact-title");
  if (contactTitle) contactTitle.innerText = t.contact_title;
  // Footer
  const footerP = document.querySelector("footer p");
  if (footerP) footerP.innerHTML = t.footer_text;
}

document.addEventListener("DOMContentLoaded", function() {
  window.setLanguage = setLanguage;
  setLanguage("eng");
  initArchitectureVisual();
  initPipelineVisual();
  initCodeToProduct();
});

function initArchitectureVisual() {
  const container = document.getElementById("arch-visual");
  if (!container) return;

  const tooltip = document.getElementById("arch-tooltip");
  const cards = Array.from(container.querySelectorAll(".arch-card"));
  const lines = {
    api: ["line-api-domain", "line-frontend-api"],
    domain: ["line-api-domain", "line-domain-infra", "line-frontend-domain"],
    infra: ["line-domain-infra"],
    frontend: ["line-frontend-api", "line-frontend-domain"]
  };

  function setLinesActive(layer, isActive) {
    const ids = lines[layer] || [];
    ids.forEach(id => {
      const line = document.getElementById(id);
      if (line) line.classList.toggle("line-active", isActive);
    });
  }

  function hideTooltip() {
    if (!tooltip) return;
    tooltip.classList.remove("visible");
  }

  function showTooltip(card) {
    if (!tooltip) return;
    const text = card.getAttribute("data-tooltip");
    if (!text) return;

    tooltip.textContent = text;
    tooltip.classList.add("visible");

    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let left = cardRect.left - containerRect.left + cardRect.width / 2 - tooltipRect.width / 2;
    let top = cardRect.top - containerRect.top - tooltipRect.height - 10;

    left = Math.max(8, Math.min(left, containerRect.width - tooltipRect.width - 8));
    top = Math.max(8, top);

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }

  container.addEventListener("mousemove", event => {
    const rect = container.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    cards.forEach(card => {
      const depth = Number(card.getAttribute("data-depth")) || 6;
      card.style.setProperty("--px", `${x * depth}px`);
      card.style.setProperty("--py", `${y * depth}px`);
    });
  });

  container.addEventListener("mouseleave", () => {
    cards.forEach(card => {
      card.style.setProperty("--px", "0px");
      card.style.setProperty("--py", "0px");
    });
  });

  cards.forEach(card => {
    const layer = card.getAttribute("data-layer");

    card.addEventListener("mouseenter", () => {
      card.classList.add("is-active");
      setLinesActive(layer, true);
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("is-active");
      setLinesActive(layer, false);
    });

    card.addEventListener("click", event => {
      event.stopPropagation();
      showTooltip(card);
    });
  });

  document.addEventListener("click", event => {
    if (!container.contains(event.target)) {
      hideTooltip();
    }
  });
}

function initPipelineVisual() {
  const container = document.getElementById("pipeline-visual");
  if (!container) return;

  const nodes = Array.from(container.querySelectorAll(".pipeline-node"));
  const panelTitle = document.getElementById("pipeline-panel-title");
  const panelDesc = document.getElementById("pipeline-panel-desc");
  const panelDetails = document.getElementById("pipeline-panel-details");
  let lockedStep = null;

  function setPanel(node, showDetails) {
    if (!node || !panelTitle || !panelDesc || !panelDetails) return;
    const title = node.getAttribute("data-title") || "";
    const desc = node.getAttribute("data-desc") || "";
    const details = (node.getAttribute("data-details") || "").split("|").filter(Boolean);

    panelTitle.textContent = title;
    panelDesc.textContent = desc;
    panelDetails.innerHTML = "";

    if (showDetails && details.length) {
      details.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        panelDetails.appendChild(li);
      });
    }
  }

  function clearActive() {
    nodes.forEach(node => node.classList.remove("is-active"));
  }

  nodes.forEach(node => {
    node.addEventListener("mouseenter", () => {
      clearActive();
      node.classList.add("is-active");
      setPanel(node, lockedStep === node);
    });

    node.addEventListener("mouseleave", () => {
      if (lockedStep && lockedStep !== node) {
        return;
      }
      node.classList.remove("is-active");
      if (!lockedStep) {
        panelTitle.textContent = "Hover a step";
        panelDesc.textContent = "See how I deliver production-ready software end to end.";
        panelDetails.innerHTML = "";
      }
    });

    node.addEventListener("click", event => {
      event.stopPropagation();
      nodes.forEach(item => item.classList.remove("is-locked"));
      if (lockedStep === node) {
        lockedStep = null;
        panelDetails.innerHTML = "";
        node.classList.remove("is-locked");
      } else {
        lockedStep = node;
        node.classList.add("is-locked");
        setPanel(node, true);
      }
    });
  });

  document.addEventListener("click", event => {
    if (!container.contains(event.target)) {
      nodes.forEach(node => node.classList.remove("is-locked", "is-active"));
      lockedStep = null;
      panelTitle.textContent = "Hover a step";
      panelDesc.textContent = "See how I deliver production-ready software end to end.";
      panelDetails.innerHTML = "";
    }
  });
}

function initCodeToProduct() {
  const container = document.getElementById("code-to-product");
  if (!container) return;

  const lines = Array.from(container.querySelectorAll(".code-line"));
  const infoTitle = document.getElementById("code-info-title");
  const infoDesc = document.getElementById("code-info-desc");
  const infoList = document.getElementById("code-info-list");
  const uiTargets = Array.from(container.querySelectorAll("[data-ui]"));
  const response = document.getElementById("ui-response");

  const responseMap = {
    auth: "JWT issued for admin - role: Manager",
    api: "GET /products → 12 items (200 OK)",
    db: "SQL Server query executed in 42ms",
    frontend: "UI refreshed with 12 product cards",
    seo: "Meta tags updated - SEO score +12%",
    deploy: "Deployment queued with SSL enabled"
  };

  let activeIndex = 0;
  let lockedLine = null;
  let loopTimer = null;

  function setActiveLine(line, showDetails) {
    if (!line) return;
    lines.forEach(item => item.classList.remove("active"));
    line.classList.add("active");

    const title = line.getAttribute("data-title") || "Code impact";
    const hoverText = line.getAttribute("data-hover") || "";
    const details = (line.getAttribute("data-click") || "").split("|").filter(Boolean);
    const target = line.getAttribute("data-target") || "";

    if (infoTitle) infoTitle.textContent = title;
    if (infoDesc) infoDesc.textContent = hoverText;
    if (infoList) {
      infoList.innerHTML = "";
      if (showDetails) {
        details.forEach(item => {
          const li = document.createElement("li");
          li.textContent = item;
          infoList.appendChild(li);
        });
      }
    }

    uiTargets.forEach(item => item.classList.remove("is-active"));
    if (target) {
      const targetEl = container.querySelector(`[data-ui="${target}"]`);
      if (targetEl) targetEl.classList.add("is-active");
      if (response && responseMap[target]) {
        response.textContent = responseMap[target];
      }
    }
  }

  function startLoop() {
    if (loopTimer) clearInterval(loopTimer);
    loopTimer = setInterval(() => {
      if (lockedLine) return;
      activeIndex = (activeIndex + 1) % lines.length;
      setActiveLine(lines[activeIndex], false);
    }, 2600);
  }

  lines.forEach((line, index) => {
    line.addEventListener("mouseenter", () => {
      if (loopTimer) clearInterval(loopTimer);
      activeIndex = index;
      setActiveLine(line, lockedLine === line);
    });

    line.addEventListener("mouseleave", () => {
      if (!lockedLine) startLoop();
    });

    line.addEventListener("click", event => {
      event.stopPropagation();
      if (lockedLine === line) {
        lockedLine = null;
        setActiveLine(line, false);
        startLoop();
      } else {
        lockedLine = line;
        setActiveLine(line, true);
      }
    });
  });

  document.addEventListener("click", event => {
    if (!container.contains(event.target)) {
      lockedLine = null;
      if (infoTitle) infoTitle.textContent = "Code to Real Product";
      if (infoDesc) infoDesc.textContent = "Hover a line to see how it changes the system.";
      if (infoList) infoList.innerHTML = "";
      startLoop();
    }
  });

  if (lines.length) {
    setActiveLine(lines[0], false);
    startLoop();
  }
}


const translations = {
  eng: {
    nav_about: "About",
    nav_education: "Education",
    nav_experience: "Experience",
    nav_projects: "Featured Projects",
    nav_skills: "Skills",
    nav_contact: "Contact",
    
    header_title: "Cavid Ibadov",
    header_role: "Full Stack Developer (.NET) | Video Editor",
    
    about_title: "About Me",
    about_text: "Hi! I'm Cavid Ibadov, a full stack developer focused on .NET and a video editor based in Baku, Azerbaijan. I study Information Technology at ADA University and build real-world web apps with ASP.NET Core, EF Core, SQL Server, and modern frontend tooling. I enjoy clean architecture, performance, and creating practical products.",
    
    education_title: "Education",
    education_list: [
      "Code Academy — Backend Developing (Expected June 2025) · Baku, Azerbaijan",
      "ADA University — B.Sc. in Information Technology (Expected May 2026) · Baku, Azerbaijan",
      "ADA High School — June 2022 · Baku, Azerbaijan",
      "Kaspi Lyceum Middle School — June 2019 · Baku, Azerbaijan"
    ],
    
    experience_title: "Relevant Experience",
    experience_details: [
      {
        title: "Back End Developer (Internship)",
        company: "AzFiberNet LLC",
        info: "Internship | Baku, Azerbaijan | June 2025 – August 30, 2025 | Internship completed",
        desc: "Successfully completed my Back End Developer internship, contributing to the development and optimization of network management systems and internal tools. Collaborated with senior engineers, learned best practices, and gained hands-on experience."
      },
      {
        title: "Video Editor",
        company: "Upwork",
        info: "Freelance | Remote | Aug 2022 – Present · 3 yrs 2 mos | Currently working",
        desc: "Produced a dynamic and visually engaging application presentation video for a Netherlands-based company, highlighting key features, functionalities, and user benefits."
      },
      {
        title: "Video Editor",
        company: "ADAli Magazine",
        info: "Club Member | Baku, Azerbaijan | 2022 – Present · 3 yrs 9 mos | Currently working",
        desc: "Produced and edited video content to align with the magazine's creative vision and audience preferences. Delivered visually compelling videos, enhancing viewer engagement."
      }
    ],
    
    projects_title: "Projects",
    projects_desc: "Full stack and web development projects.",
    project_bullets: [
      "Built with ASP.NET Core and EF Core for backend logic, with SQL Server for secure data storage.",
      "Designed and implemented an admin panel with role-based login authentication, enabling the client to manage products, categories, and content easily.",
      "Developed the frontend using HTML, CSS, and JavaScript, ensuring a modern, mobile-friendly design.",
      "Optimized SEO through meta tags and sitemap.xml for better Google Search visibility.",
      "Deployed the project to live hosting."
    ],
    
    skills_title: "Skills & Awards",
    skills_list: [
      "Backend: ASP.NET Core (MVC, Web API), .NET 8, EF Core, REST APIs, Authentication (JWT, Google Login)",
      "Architecture: Clean/Onion Architecture, CQRS-lite, API documentation",
      "Programming: C#, C/C++, Java, JavaScript, Python",
      "Frontend: HTML5, CSS3, JavaScript (ES6+), React (Vite), Bootstrap, Tailwind (basic), GSAP (basic)",
      "Databases: SQL Server, PostgreSQL, MySQL, Oracle (basic), EF Core Migrations",
      "DevOps & Tools: Git/GitHub, Docker (basic), Azure (basic), GCP (basic), Postman, VS, VS Code, IntelliJ"
    ],
    awards_list: [
      "Software Development Diploma – Code Academy (Aug 2024–May 2025)",
      "Hackathon Participation Certificate – Team Leader (Dec 13, 2025)",
      "ADAli Magazine Club Certificate – Video Editor (Apr 2022–Present)",
      "GOAL+ – Football player contestant (Jul 2024)",
      "Middle School Science Competitions – multiple certificates",
      "Geography Science Competition 2016 – 3rd place",
      "Chemistry Science Competition 2017 – 2nd place",
      "Sports Tournament (Basketball) 2017 – 1st place",
      "Sports Tournament (Football) 2018 – 1st place",
      "ADA Sports Tournament 2023 – 2nd place"
    ],
    
    contact_title: "Contact",
    contact_info: [
      {icon: "envelope", text: "ibadovjavid19@gmail.com", link: "mailto:ibadovjavid19@gmail.com"},
      {icon: "github", text: "GitHub", link: "https://github.com/Cibadov13097"},
      {icon: "linkedin", text: "LinkedIn", link: "https://www.linkedin.com/in/javid-ibadov"},
      {icon: "globe", text: "Portfolio", link: "https://cavidibadov.site/"}
    ],
    
    footer_text: "&copy; 2026 Cavid Ibadov. All rights reserved."
  },
  
  rus: {
    nav_about: "Обо мне",
    nav_education: "Образование",
    nav_experience: "Опыт работы",
    nav_projects: "Избранные проекты",
    nav_skills: "Навыки",
    nav_contact: "Контакты",
    
    header_title: "Cavid Ibadov",
    header_role: "Full Stack разработчик (.NET) | Видео редактор",
    
    about_title: "Обо мне",
    about_text: "Я Джавид Ибадов, увлеченный Full Stack разработчик (.NET) и видео редактор из Баку, Азербайджан. Люблю создавать проекты, редактировать видео и изучать новые технологии. В настоящее время изучаю информационные технологии в ADA University и развиваю навыки в различных языках программирования и фреймворках.",
    
    education_title: "Образование",
    education_list: [
      "Code Academy — Backend Developing (Ожидаемое окончание Июнь 2025) · Баку, Азербайджан",
      "ADA University — Бакалавр информационных технологий (Ожидаемое окончание Май 2026) · Баку, Азербайджан",
      "ADA High School — Июнь 2022 · Баку, Азербайджан",
      "Kaspi Lyceum Middle School — Июнь 2019 · Баку, Азербайджан"
    ],
    
    experience_title: "Опыт работы",
    experience_details: [
      {
        title: "Back End Developer (Стажировка)",
        company: "AzFiberNet LLC",
        info: "Стажировка | Баку, Азербайджан | Июнь 2025 – 30 Августа 2025 | Стажировка завершена",
        desc: "Успешно завершил стажировку Back End Developer, участвовал в разработке и оптимизации систем управления сетью и внутренних инструментов. Сотрудничал с опытными инженерами, изучал лучшие практики и получил практический опыт."
      },
      {
        title: "Видео редактор",
        company: "Upwork",
        info: "Фриланс | Удаленно | Авг 2022 – настоящее время · 3 года 2 месяца | В работе",
        desc: "Создал динамичное и визуально привлекательное видео-презентацию приложения для компании из Нидерландов, выделяя ключевые функции и преимущества для пользователей."
      },
      {
        title: "Видео редактор",
        company: "ADAli Magazine",
        info: "Член клуба | Баку, Азербайджан | 2022 – настоящее время · 3 года 9 месяцев | В работе",
        desc: "Производил и редактировал видео-контент в соответствии с творческим видением журнала и предпочтениями аудитории."
      }
    ],
    
    projects_title: "Проекты",
    projects_desc: "Full stack и веб-проекты.",
    project_bullets: [
      "Использовались ASP.NET Core и EF Core для серверной логики, SQL Server для безопасного хранения данных.",
      "Разработана и внедрена админ-панель с ролевой аутентификацией, позволяющая клиенту управлять продуктами, категориями и контентом.",
      "Фронтенд реализован с помощью HTML, CSS и JavaScript, обеспечивая современный и мобильный дизайн.",
      "SEO оптимизация через мета-теги и sitemap.xml для лучшей видимости в Google Search.",
      "Проект развернут на хостинге."
    ],
    
    skills_title: "Навыки и награды",
    skills_list: [
      "Backend: ASP.NET Core (MVC, Web API), .NET 8, EF Core, REST APIs, аутентификация (JWT, Google Login)",
      "Архитектура: Clean/Onion Architecture, CQRS-lite, документация API",
      "Программирование: C#, C/C++, Java, JavaScript, Python",
      "Frontend: HTML5, CSS3, JavaScript (ES6+), React (Vite), Bootstrap, Tailwind (basic), GSAP (basic)",
      "Базы данных: SQL Server, PostgreSQL, MySQL, Oracle (basic), EF Core Migrations",
      "DevOps и инструменты: Git/GitHub, Docker (basic), Azure (basic), GCP (basic), Postman, VS, VS Code, IntelliJ"
    ],
    awards_list: [
      "Diploma по разработке ПО – Code Academy (Авг 2024–Май 2025)",
      "Сертификат хакатона – Team Leader (13 Дек 2025)",
      "ADAli Magazine Club – Video Editor (Апр 2022–настоящее время)",
      "GOAL+ – участник футбольного конкурса (Июл 2024)",
      "Средняя школа: научные конкурсы – несколько сертификатов",
      "География 2016 – 3-е место",
      "Химия 2017 – 2-е место",
      "Баскетбольный турнир 2017 – 1-е место",
      "Футбольный турнир 2018 – 1-е место",
      "Спортивный турнир ADA 2023 – 2-е место"
    ],
    
    contact_title: "Контакты",
    contact_info: [
      {icon: "envelope", text: "ibadovjavid19@gmail.com", link: "mailto:ibadovjavid19@gmail.com"},
      {icon: "github", text: "GitHub", link: "https://github.com/Cibadov13097"},
      {icon: "linkedin", text: "LinkedIn", link: "https://www.linkedin.com/in/javid-ibadov"},
      {icon: "globe", text: "Portfolio", link: "https://cavidibadov.site/"}
    ],
    
    footer_text: "&copy; 2026 Джавид Ибадов. Все права защищены."
  },
  
  aze: {
    nav_about: "Haqqımda",
    nav_education: "Təhsil",
    nav_experience: "Təcrübə",
    nav_projects: "Layihələr",
    nav_skills: "Bacarıqlar",
    nav_contact: "Əlaqə",
    
    header_title: "Cavid Ibadov",
    header_role: "Full Stack Developer (.NET) | Video Redaktor",
    
    about_title: "Haqqımda",
    about_text: "Salam! Mən ADA Universitetinin tələbəsi Cavid İbadov, .NET texnologiyaları üzrə əsasən çalışan full stack developer və video redaktoram. Baku, Azərbaycan şəhərində yaşayıram. Maraqlı layihələr qurmağı, videoları redaktə etməyi və yeni texnologiyaları öyrənməyi sevirəm. ADA Universitetində təhsil alıram və müxtəlif proqramlaşdırma dilləri və frameworklər üzrə bacarıqlarımı inkişaf etdirirəm.",
    
    education_title: "Təhsil",
    education_list: [
      "Code Academy — Backend Developing (Gözlənilən bitmə: İyun 2025) · Bakı, Azərbaycan",
      "ADA Universiteti — İnformasiya Texnologiyaları bakalavrı (Gözlənilən bitmə: May 2026) · Bakı, Azərbaycan",
      "ADA Liseyi — İyun 2022 · Bakı, Azərbaycan",
      "Kaspi Lyceum Orta Məktəbi — İyun 2019 · Bakı, Azərbaycan"
    ],
    
    experience_title: "Əsas Təcrübə",
    experience_details: [
      {
        title: "Back End Developer (Təcrübə)",
        company: "AzFiberNet LLC",
        info: "Təcrübə | Bakı, Azərbaycan | İyun 2025 – 30 Avqust 2025 | Təcrübə tamamlandı",
        desc: "Back End Developer təcrübəmi uğurla tamamladım, AzFiberNet LLC üçün şəbəkə idarəetmə sistemlərinin və daxili alətlərin inkişafına və optimizasiyasına töhfə verdim. Senior mühəndislərlə əməkdaşlıq etdim, ən yaxşı təcrübələri öyrəndim və praktik təcrübə qazandım."
      },
      {
        title: "Video Redaktor",
        company: "Upwork",
        info: "Freelance | Uzaqdan | Avqust 2022 – Hazırda · 3 il 2 ay | Hal-hazırda işləyir",
        desc: "Niderlandda yerləşən bir şirkət üçün dinamik və vizual cəlbedici tətbiq təqdimatı videosu hazırladım, əsas xüsusiyyətləri, funksionallıqları və istifadəçi faydalarını vurğuladım."
      },
      {
        title: "Video Redaktor",
        company: "ADAli Magazine",
        info: "Klub üzvü | Bakı, Azərbaycan | 2022 – Hazırda · 3 il 9 ay | Hal-hazırda işləyir",
        desc: "Məqalə jurnalının yaradıcı vizyonuna və auditoriya tələblərinə uyğun video məzmunu hazırladım və redaktə etdim. Vizual baxımdan cəlbedici videolar təqdim etdim."
      }
    ],
    
    projects_title: "Layihələr",
    projects_desc: "Full stack və veb layihələr.",
    project_bullets: [
      "Backend üçün ASP.NET Core və EF Core, SQL Server ilə təhlükəsiz məlumat saxlanması.",
      "Admin panelini rol əsaslı giriş ilə dizayn etdim, müştəri məhsulları, kateqoriyaları və məzmunu rahat idarə edə bilir.",
      "Frontend HTML, CSS və JavaScript ilə hazırlanıb, müasir və mobil dostu dizayn təmin edilib.",
      "SEO optimizasiyası üçün meta taglar və sitemap.xml əlavə edildi, Google axtarışında daha yaxşı görünürlük üçün.",
      "Layihə hostingə yerləşdirildi."
    ],
    
    skills_title: "Bacarıqlar və Mükafatlar",
    skills_list: [
      "Backend: ASP.NET Core (MVC, Web API), .NET 8, EF Core, REST API-lər, Authentication (JWT, Google Login)",
      "Arxitektura: Clean/Onion Architecture, CQRS-lite, API sənədləşdirmə",
      "Proqramlaşdırma: C#, C/C++, Java, JavaScript, Python",
      "Frontend: HTML5, CSS3, JavaScript (ES6+), React (Vite), Bootstrap, Tailwind (basic), GSAP (basic)",
      "Verilənlər bazası: SQL Server, PostgreSQL, MySQL, Oracle (basic), EF Core Migrations",
      "DevOps və alətlər: Git/GitHub, Docker (basic), Azure (basic), GCP (basic), Postman, VS, VS Code, IntelliJ"
    ],
    awards_list: [
      "Software Development Diplomu – Code Academy (Avq 2024–May 2025)",
      "Hackathon Sertifikatı – Team Leader (13 Dek 2025)",
      "ADAli Magazine Club – Video Redaktor (Apr 2022–Hazırda)",
      "GOAL+ – Futbol iştirakçısı (İyul 2024)",
      "Orta məktəb elmi müsabiqələri – bir neçə sertifikat",
      "Coğrafiya 2016 – 3-cü yer",
      "Kimya 2017 – 2-ci yer",
      "Basketbol Turniri 2017 – 1-ci yer",
      "Futbol Turniri 2018 – 1-ci yer",
      "ADA İdman Turniri 2023 – 2-ci yer"
    ],
    
    contact_title: "Əlaqə",
    contact_info: [
      {icon: "envelope", text: "ibadovjavid19@gmail.com", link: "mailto:ibadovjavid19@gmail.com"},
      {icon: "github", text: "GitHub", link: "https://github.com/Cibadov13097"},
      {icon: "linkedin", text: "LinkedIn", link: "https://www.linkedin.com/in/javid-ibadov"},
      {icon: "globe", text: "Portfolio", link: "https://cavidibadov.site/"}
    ],
    
    footer_text: "&copy; 2026 Cavid Ibadov. Bütün hüquqlar qorunur."
  }
};
