const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSc0gVhdbUml1qrMl_SgyEOGZvRZ49QyY73jqda2Hjqb71vmjI_yh-hsCKrOn_V7C2RpdYt7rfBcWsI/pub?gid=0&single=true&output=csv';

let semuaData = [];

fetch(sheetURL)
  .then(res => res.text())
  .then(text => {
    const rows = text.split('\n').slice(1);

    semuaData = rows.map(row => {
      const [kategori, kode, keterangan, harga, status] = row.split(',');

      return {
        kategori: kategori?.trim(),
        kode: kode?.trim(),
        keterangan: keterangan?.trim(),
        harga: harga?.trim(),
        status: status?.trim()
      };
    });

    tampilkanData(semuaData);
    isiKategori(semuaData);
  });

function tampilkanData(data) {
  const tbody = document.getElementById('data');
  tbody.innerHTML = '';

  data.forEach(item => {
    tbody.innerHTML += `
      <tr>
        <td>${item.kategori}</td>
        <td>${item.kode}</td>
        <td>${item.keterangan}</td>
        <td>${item.harga}</td>
        <td>${item.status}</td>
      </tr>
    `;
  });
}

function isiKategori(data) {
  const select = document.getElementById('kategori');
  const kategoriUnik = [...new Set(data.map(d => d.kategori))];

  kategoriUnik.forEach(k => {
    if (k) {
      select.innerHTML += `<option value="${k}">${k}</option>`;
    }
  });
}

document.getElementById('search').addEventListener('input', filterData);
document.getElementById('kategori').addEventListener('change', filterData);

function filterData() {
  const keyword = document.getElementById('search').value.toLowerCase();
  const kategori = document.getElementById('kategori').value;

  const hasil = semuaData.filter(item =>
    (item.kode.toLowerCase().includes(keyword) ||
     item.keterangan.toLowerCase().includes(keyword)) &&
    (kategori === '' || item.kategori === kategori)
  );

  tampilkanData(hasil);
}
