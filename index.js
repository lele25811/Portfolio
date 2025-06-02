async function loadProjects() {
    try {
      const response = await fetch('projects.json');
      if (!response.ok) throw new Error('Impossibile caricare projects.json');
      const projects = await response.json();

      const sections = {
        'computer-vision': document.querySelector('#computer-vision .project-grid'),
        'giochi': document.querySelector('#giochi .project-grid'),
        'altri': document.querySelector('#altri .project-grid')
      };

      Object.values(sections).forEach(container => container.innerHTML = '');

      projects.forEach(proj => {
        const div = document.createElement('div');
        div.classList.add('project');
        div.innerHTML = `
          <h3>${proj.name}</h3>
          <p>${proj.description}</p>
          <a href="${proj.url}" target="_blank" rel="noopener noreferrer">Vedi su GitHub</a>
        `;
        if (sections[proj.category]) {
          sections[proj.category].appendChild(div);
        } else {
          sections['altri'].appendChild(div);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  loadProjects();