(() => {
  // Local storage keys
  const LS = {
    students: 'rs_students',
    subjects: 'rs_subjects'
  };

  // State
  let students = [];
  let subjects = [];

  // UI refs
  const sections = {
    students: document.getElementById('section-students'),
    subjects: document.getElementById('section-subjects'),
    results: document.getElementById('section-results')
  };
  const navBtns = {
    students: document.getElementById('nav-students'),
    subjects: document.getElementById('nav-subjects'),
    results: document.getElementById('nav-results')
  };

  // Load initial data
  function load() {
    students = JSON.parse(localStorage.getItem(LS.students) || '[]');
    subjects = JSON.parse(localStorage.getItem(LS.subjects) || '[]');
  }

  function save() {
    localStorage.setItem(LS.students, JSON.stringify(students));
    localStorage.setItem(LS.subjects, JSON.stringify(subjects));
  }

  // Helpers
  function uid() { return Math.random().toString(36).slice(2, 9); }

  function showSection(name) {
    Object.values(sections).forEach(s => s.classList.remove('active'));
    sections[name].classList.add('active');
    // update title highlight
    Object.values(navBtns).forEach(b => b.classList.remove('active'));
    navBtns[name].classList.add('active');
  }

  // Render lists
  function renderStudents() {
    const tbody = document.querySelector('#table-students tbody');
    tbody.innerHTML = '';
    for (const st of students) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${st.name}</td>
        <td>${st.roll || ''}</td>
        <td>${st.class || ''}${st.section ? ' ' + st.section : ''}</td>
        <td>
          <button class="btn" data-id="${st.id}" data-action="edit-stud">Edit</button>
          <button class="btn secondary" data-id="${st.id}" data-action="delete-stud">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    }
  }

  function renderSubjects() {
    const tbody = document.querySelector('#table-subjects tbody');
    tbody.innerHTML = '';
    for (const sub of subjects) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${sub.name}</td>
        <td>${sub.maxMarks || ''}</td>
        <td>
          <button class="btn" data-id="${sub.id}" data-action="edit-subj">Edit</button>
          <button class="btn secondary" data-id="${sub.id}" data-action="delete-subj">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    }
  }

  // Modals
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  function openModal(html) {
    modalContent.innerHTML = html;
    modal.setAttribute('aria-hidden', 'false');
  }
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modalContent.innerHTML = '';
  }
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Add/Edit Student Form
  function studentForm(existing = null) {
    const isEdit = !!existing;
    const name = existing?.name || '';
    const roll = existing?.roll || '';
    const cls = existing?.class || '';
    const sec = existing?.section || '';

    const html = `
      <h3>${isEdit ? 'Edit' : 'Add'} Student</h3>
      <label>Name</label><input class="input" id="inp-name" value="${name}">
      <label>Roll</label><input class="input" id="inp-roll" value="${roll}">
      <label>Class</label><input class="input" id="inp-class" value="${cls}">
      <label>Section</label><input class="input" id="inp-section" value="${sec}">
      <div style="margin-top:12px;text-align:right">
        <button class="btn" id="save-stud">${isEdit ? 'Save' : 'Add'}</button>
      </div>
    `;
    openModal(html);
    document.getElementById('save-stud').addEventListener('click', () => {
      const n = document.getElementById('inp-name').value.trim();
      const r = document.getElementById('inp-roll').value.trim();
      const c = document.getElementById('inp-class').value.trim();
      const s = document.getElementById('inp-section').value.trim();

      if (!n) return alert('Name is required');
      if (isEdit) {
        existing.name = n; existing.roll = r; existing.class = c; existing.section = s;
      } else {
        const st = { id: uid(), name: n, roll: r, class: c, section: s, subjects: [] };
        students.push(st);
      }
      save();
      renderStudents();
      closeModal();
    });
  }

  // Add/Edit Subject Form
  function subjectForm(existing = null) {
    const isEdit = !!existing;
    const name = existing?.name || '';
    const maxMarks = existing?.maxMarks || '';

    const html = `
      <h3>${isEdit ? 'Edit' : 'Add'} Subject</h3>
      <label>Name</label><input class="input" id="inp-sub-name" value="${name}">
      <label>Max Marks</label><input class="input" id="inp-sub-max" type="number" value="${maxMarks}">
      <div style="margin-top:12px;text-align:right">
        <button class="btn" id="save-subj">${isEdit ? 'Save' : 'Add'}</button>
      </div>
    `;
    openModal(html);
    document.getElementById('save-subj').addEventListener('click', () => {
      const n = document.getElementById('inp-sub-name').value.trim();
      const m = Number(document.getElementById('inp-sub-max').value);
      if (!n) return alert('Subject name required');
      if (!Number.isFinite(m) || m <= 0) return alert('Max marks must be positive');
      if (isEdit) {
        existing.name = n; existing.maxMarks = m;
      } else {
        const sub = { id: uid(), name: n, maxMarks: m };
        subjects.push(sub);
      }
      save();
      renderSubjects();
      closeModal();
    });
  }

  // Results area (simplified)
  function renderResultsForStudent(stud) {
    // Ensure marks structure exists
    const sSubs = subjects;
    const rows = sSubs.map(sub => {
      // find existing mark
      const mark = (stud.subjects || []).find(x => x.subjectId === sub.id);
      const val = mark?.marks ?? '';
      return `<tr data-subid="${sub.id}">
        <td>${sub.name}</td>
        <td>${sub.maxMarks}</td>
        <td><input class="input" type="number" min="0" max="${sub.maxMarks}" value="${val}" /></td>
      </tr>`;
    }).join('');
    return `
      <table class="data-table" style="margin-top:8px">
        <thead><tr><th>Subject</th><th>Max</th><th>Marks</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <button class="btn" id="save-results">Save Marks</button>
    `;
  }

  // Load initial sample data if empty
  function seedIfNeeded() {
    if (subjects.length === 0) {
      subjects = [
        { id: uid(), name: 'Mathematics', maxMarks: 100 },
        { id: uid(), name: 'Science', maxMarks: 100 },
        { id: uid(), name: 'English', maxMarks: 100 }
      ];
    }
    if (students.length === 0) {
      students = [
        { id: uid(), name: 'Alice', roll: '01', class: '10', section: 'A', subjects: [] },
        { id: uid(), name: 'Bob', roll: '02', class: '10', section: 'A', subjects: [] }
      ];
    }
    save();
  }

  // Setup
  function init() {
    load();
    seedIfNeeded();
    renderStudents();
    renderSubjects();
    // populate selects
    const selectStudent = document.getElementById('select-student');
    const updateStudentOptions = () => {
      selectStudent.innerHTML = '';
      students.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = `${s.name} (${s.roll})`;
        selectStudent.appendChild(opt);
      });
    };
    updateStudentOptions();

    // nav
    navBtns.students.addEventListener('click', () => showSection('students'));
    navBtns.subjects.addEventListener('click', () => showSection('subjects'));
    navBtns.results.addEventListener('click', () => showSection('results'));

    // section buttons
    document.getElementById('btn-add-student').addEventListener('click', () => studentForm());
    document.getElementById('btn-add-subject').addEventListener('click', () => subjectForm());

    // table actions
    document.querySelector('#table-students tbody').addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const id = btn.dataset.id;
      if (btn.dataset.action === 'edit-stud') {
        const st = students.find(x => x.id === id);
        if (st) studentForm(st);
      } else if (btn.dataset.action === 'delete-stud') {
        if (confirm('Delete student?')) {
          students = students.filter(x => x.id !== id);
          save();
          renderStudents();
        }
      }
    });
    document.querySelector('#table-subjects tbody').addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const id = btn.dataset.id;
      if (btn.dataset.action === 'edit-subj') {
        const s = subjects.find(x => x.id === id);
        if (s) subjectForm(s);
      } else if (btn.dataset.action === 'delete-subj') {
        if (confirm('Delete subject?')) {
          subjects = subjects.filter(x => x.id !== id);
          // also remove from students' subjects
          students.forEach(st => {
            st.subjects = st.subjects.filter(x => x.subjectId !== id);
          });
          save();
          renderSubjects();
        }
      }
    });

    // search
    document.getElementById('search-student').addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      const rows = document.querySelectorAll('#table-students tbody tr');
      rows.forEach(tr => {
        const text = tr.textContent.toLowerCase();
        tr.style.display = text.includes(q) ? '' : 'none';
      });
    });

    // Results area basic flow
    document.getElementById('btn-add-result').addEventListener('click', () => {
      const sid = document.getElementById('select-student').value;
      const stud = students.find(x => x.id === sid);
      if (!stud) return;
      // ensure marks structure
      if (!stud.subjects) stud.subjects = [];
      const html = `
        <h3>Enter Marks for ${stud.name}</h3>
        ${renderResultsForStudent(stud)}
      `;
      openModal(html);
      // populate existing marks inputs
      document.getElementById('save-results').addEventListener('click', () => {
        const rows = document.querySelectorAll('#modal-content table tbody tr');
        rows.forEach(tr => {
          const subId = tr.dataset.subid;
          const input = tr.querySelector('input');
          const val = Number(input.value);
          if (!Number.isFinite(val)) return;
          let rec = stud.subjects.find(x => x.subjectId === subId);
          if (!rec) {
            rec = { subjectId: subId, marks: val };
            stud.subjects.push(rec);
          } else {
            rec.marks = val;
          }
        });
        save();
        closeModal();
      });
    });

    // initial populate
    updateStudentOptions();
  }

  // Start
  init();
})();