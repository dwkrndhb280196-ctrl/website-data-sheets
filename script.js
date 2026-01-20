const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSc0gVhdbUml1qrMl_SgyEOGZvRZ49QyY73jqda2Hjqb71vmjI_yh-hsCKrOn_V7C2RpdYt7rfBcWsI/pub?gid=0&single=true&output=csv';

let data = [];

fetch(sheetURL)
  .then(res => res.text())
  .then(text => {
    const rows = text.split('\n').slice(1);
    data = rows.map(row => {
      const [id, nama, kategori, deskripsi] = row.split(',');
      return { id, nama, kategori, deskripsi };
    });
    tampilkanData(data);
    isiKategori(data);
  });

function tampilkanData(list) {
  const ul = document.getElementById('list');
  ul.innerHTML = '';
  list.forEach(item => {
    ul.innerHTML += `<li><b>${item.nama}</b> - ${item.kategori}</li>`;
  });
}

function isiKategori(data) {
  const select = document.getElementById('kategori');
  const kategoriUnik = [...new Set(data.map(d => d.kategori))];
  kategoriUnik.forEach(k => {
    select.innerHTML += `<option value="${k}">${k}</option>`;
  });
}

document.getElementById('search').addEventListener('input', filter);
document.getElementById('kategori').addEventListener('change', filter);

function filter() {
  const keyword = document.getElementById('search').value.toLowerCase();
  const kategori = document.getElementById('kategori').value;

  const hasil = data.filter(item =>
    item.nama.toLowerCase().includes(keyword) &&
    (kategori === '' || item.kategori === kategori)
  );

  tampilkanData(hasil);
}
