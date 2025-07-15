// src/data/coursesData.js

// src/data/coursesData.js

export const coursesData = [
  {
    id: 1,
    title: "Pengantar Pemrograman Web",
    description:
      "Pelajari langkah demi langkah cara membangun website dari nol! Dalam kursus ini, kamu akan memahami struktur HTML, mempercantik tampilan dengan CSS, dan menambahkan interaktivitas menggunakan JavaScript. Dirancang khusus untuk pemula yang ingin memulai karir sebagai web developer atau membangun proyek digital pribadi.",
    image: '/images/webdev.jpg',
    category: "Web Development",
    price: "Gratis",
    syllabus: [
      {
        title: "Pengenalan HTML",
        content:
          "Pelajari dasar-dasar HTML, mulai dari struktur dokumen hingga tag penting yang sering digunakan.",
      },
      {
        title: "Styling dengan CSS",
        content:
          "Pahami cara mengatur layout, warna, dan elemen visual menggunakan CSS untuk menciptakan tampilan web yang menarik.",
      },
      {
        title: "Interaktivitas dengan JavaScript",
        content:
          "Mulai menulis skrip JavaScript untuk membuat halaman web lebih hidup dan responsif terhadap pengguna.",
      },
    ],
    mentor: "Fadli Zaenal Aripin, S.Kom, M.S.",
    mentorImage: '/images/foto fadli.jpg',
    mentorBio:
      "Fadli adalah seorang web developer profesional dengan pengalaman lebih dari 10 tahun di dunia teknologi. Ia telah membimbing ratusan siswa dan terlibat dalam berbagai proyek website skala kecil hingga enterprise.",
    lessons: [
      {
        id: 101,
        title: "Pelajaran 1: Pengantar HTML",
        type: "text",
        duration: "10:00 (baca)",
        content: `HTML (HyperText Markup Language) adalah bahasa standar untuk membuat halaman web. HTML mendeskripsikan struktur halaman web secara semantik dan awalnya isyarat untuk penampilan dokumen. HTML terdiri dari serangkaian elemen. Elemen HTML memberi tahu browser cara menampilkan konten. Elemen label potongan konten seperti 'ini adalah judul', 'ini adalah paragraf', 'ini adalah tautan', dll.
        
        HTML adalah tulang punggung dari setiap halaman web. Tanpa HTML, tidak ada struktur atau konten yang dapat ditampilkan oleh browser. Ini adalah fondasi dari semua yang Anda lihat di internet.`
      },
      {
        id: 102,
        title: "Pelajaran 2: Struktur Dasar HTML",
        type: "text",
        duration: "8:00 (baca)",
        content: `Materi teks tentang tag-tag dasar seperti \`&lt;html&gt;\`, \`&lt;head&gt;\`, \`&lt;body&gt;\`, \`&lt;h1&gt;\`, \`&lt;p&gt;\`, \`&lt;a&gt;\`, \`&lt;img&gt;\`. Setiap dokumen HTML dimulai dengan deklarasi \`&lt;!DOCTYPE html&gt;\` dan elemen \`&lt;html&gt;\` sebagai root. Bagian \`&lt;head&gt;\` berisi metadata tentang dokumen (seperti judul halaman, link ke stylesheet, atau skrip), sedangkan \`&lt;body&gt;\` berisi semua konten yang terlihat oleh pengguna seperti teks, gambar, video, dan link.

        Contoh struktur dasar:
        \`\`\`html
        &lt;!DOCTYPE html&gt;
        &lt;html lang="en"&gt;
        &lt;head&gt;
            &lt;meta charset="UTF-8"&gt;
            &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
            &lt;title&gt;Judul Halaman Saya&lt;/title&gt;
        &lt;/head&gt;
        &lt;body&gt;
            &lt;h1&gt;Selamat Datang!&lt;/h1&gt;
            &lt;p&gt;Ini adalah paragraf pertama saya.&lt;/p&gt;
            &lt;a href="https://www.google.com"&gt;Kunjungi Google&lt;/a&gt;
            &lt;img src="gambar.jpg" alt="Contoh Gambar"&gt;
        &lt;/body&gt;
        &lt;/html&gt;
        \`\`\`
        Memahami struktur ini sangat penting untuk membangun halaman web yang terorganisir.`
      },
      {
        id: 103,
        title: "Pelajaran 3: Memulai CSS",
        type: "text",
        duration: "12:00 (baca)",
        content: `CSS (Cascading Style Sheets) adalah bahasa yang digunakan untuk mendeskripsikan presentasi dokumen yang ditulis dalam markup language seperti HTML. CSS mendeskripsikan bagaimana elemen harus dirender di layar, di kertas, atau di media lain. Ini memisahkan konten dokumen dari presentasi dokumen, termasuk layout, warna, dan font. Anda akan belajar tentang selektor, properti, dan nilai.

        Ada tiga cara utama untuk menyertakan CSS dalam dokumen HTML:
        1.  **Inline CSS**: Menggunakan atribut \`style\` langsung di dalam tag HTML. (Kurang direkomendasikan untuk proyek besar)
        2.  **Internal CSS**: Menggunakan tag \`&lt;style&gt;\` di dalam bagian \`&lt;head&gt;\` dokumen HTML. (Baik untuk halaman tunggal)
        3.  **External CSS**: Menggunakan file \`.css\` terpisah yang dihubungkan dengan tag \`&lt;link&gt;\` di bagian \`&lt;head&gt;\`. (Paling direkomendasikan untuk proyek kompleks)

        Selektor adalah pola yang cocok dengan elemen di pohon elemen. Properti adalah atribut gaya yang ingin Anda ubah (misalnya, \`color\`, \`font-size\`). Nilai adalah nilai yang Anda berikan pada properti (misalnya, \`red\`, \`16px\`).`
      },
      {
        id: 104,
        title: "Kuis 1: Dasar-dasar HTML & CSS",
        type: "quiz",
        duration: "10:00",
        content: "Uji pemahaman Anda tentang dasar-dasar HTML dan CSS yang telah dipelajari.",
        quizQuestions: [
          {
            question: "Elemen HTML mana yang digunakan untuk membuat daftar tak berurutan?",
            options: ["<ol>", "<li>", "<ul>", "<dl>"],
            answer: "<ul>"
          },
          {
            question: "Properti CSS mana yang digunakan untuk mengubah warna teks?",
            options: ["background-color", "font-color", "color", "text-style"],
            answer: "color"
          },
          {
            question: "Bagaimana cara menyertakan file CSS eksternal ke dalam dokumen HTML?",
            options: ["<style src='style.css'>", "<link rel='stylesheet' href='style.css'>", "<css src='style.css'>", "<import style='style.css'>"],
            answer: "<link rel='stylesheet' href='style.css'>"
          }
        ]
      },
      {
        id: 105,
        title: "Pelajaran 4: Membangun Formulir HTML",
        type: "text",
        duration: "18:00 (baca)",
        content: `Formulir HTML adalah elemen penting untuk berinteraksi dengan pengguna. Formulir digunakan untuk mengumpulkan input pengguna, seperti nama, email, password, dll. Elemen \`&lt;form&gt;\` adalah wadah untuk semua elemen input formulir.

        Beberapa elemen input yang umum digunakan:
        - \`&lt;input type="text"&gt;\`: Untuk input teks satu baris.
        - \`&lt;input type="password"&gt;\`: Untuk input password (teks tersembunyi).
        - \`&lt;input type="submit"&gt;\`: Tombol untuk mengirim formulir.
        - \`&lt;textarea&gt;\`: Untuk input teks multi-baris.
        - \`&lt;select&gt;\`: Untuk daftar drop-down.
        - \`&lt;input type="radio"&gt;\`: Untuk pilihan tunggal dari beberapa opsi.
        - \`&lt;input type="checkbox"&gt;\`: Untuk pilihan ganda.

        Penting juga untuk menggunakan atribut \`name\` untuk setiap input, karena ini akan digunakan saat data formulir dikirim ke server. Atribut \`label\` juga harus digunakan untuk aksesibilitas, menghubungkannya dengan input menggunakan atribut \`for\` dan \`id\`.
        
        Contoh:
        \`\`\`html
        &lt;form action="/submit-form" method="post"&gt;
            &lt;label for="nama"&gt;Nama:&lt;/label&gt;&lt;br&gt;
            &lt;input type="text" id="nama" name="nama"&gt;&lt;br&gt;
            &lt;label for="email"&gt;Email:&lt;/label&gt;&lt;br&gt;
            &lt;input type="email" id="email" name="email"&gt;&lt;br&gt;&lt;br&gt;
            &lt;input type="submit" value="Kirim"&gt;
        &lt;/form&gt;
        \`\`\`
        Formulir memungkinkan website menjadi lebih dinamis dan fungsional.`
      },
      {
        id: 106,
        title: "Pelajaran 5: Bekerja dengan Tabel HTML",
        type: "text",
        duration: "14:00 (baca)",
        content: `Tabel HTML digunakan untuk menampilkan data dalam format baris dan kolom. Meskipun untuk layout modern lebih sering menggunakan CSS Flexbox atau Grid, tabel tetap esensial untuk data tabular.

        Elemen-elemen dasar tabel:
        - \`&lt;table&gt;\`: Mendefinisikan tabel.
        - \`&lt;tr&gt;\`: Mendefinisikan baris tabel (Table Row).
        - \`&lt;th&gt;\`: Mendefinisikan header tabel (Table Header).
        - \`&lt;td&gt;\`: Mendefinisikan data sel tabel (Table Data).
        - \`&lt;thead&gt;\`: Mengelompokkan konten header dalam tabel.
        - \`&lt;tbody&gt;\`: Mengelompokkan konten body dalam tabel.
        - \`&lt;tfoot&gt;\`: Mengelompokkan konten footer dalam tabel.

        Menggunakan \`&lt;thead&gt;\`, \`&lt;tbody&gt;\`, dan \`&lt;tfoot&gt;\` membantu struktur semantik tabel dan memungkinkan browser atau alat bantu aksesibilitas memahami struktur data dengan lebih baik. Anda juga bisa menggunakan atribut seperti \`colspan\` dan \`rowspan\` untuk menggabungkan sel.

        Contoh:
        \`\`\`html
        &lt;table&gt;
            &lt;thead&gt;
                &lt;tr&gt;
                    &lt;th&gt;Produk&lt;/th&gt;
                    &lt;th&gt;Harga&lt;/th&gt;
                &lt;/tr&gt;
            &lt;/thead&gt;
            &lt;tbody&gt;
                &lt;tr&gt;
                    &lt;td&gt;Laptop&lt;/td&gt;
                    &lt;td&gt;$1200&lt;/td&gt;
                &lt;/tr&gt;
                &lt;tr&gt;
                    &lt;td&gt;Mouse&lt;/td&gt;
                    &lt;td&gt;$25&lt;/td&gt;
                &lt;/tr&gt;
            &lt;/tbody&gt;
            &lt;tfoot&gt;
                &lt;tr&gt;
                    &lt;td&gt;Total&lt;/td&gt;
                    &lt;td&gt;$1225&lt;/td&gt;
                &lt;/tr&gt;
            &lt;/tfoot&gt;
        &lt;/table&gt;
        \`\`\`
        Tabel adalah alat yang ampuh untuk menyajikan data terstruktur.`
      },
      {
        id: 107,
        title: "Kuis 2: Selektor CSS Lanjutan",
        type: "quiz",
        duration: "15:00",
        content: "Uji pemahaman Anda tentang selektor CSS yang lebih kompleks dan bagaimana menggunakannya secara efektif.",
        quizQuestions: [
          {
            question: "Selektor CSS mana yang memilih semua elemen `&lt;p&gt;` yang merupakan anak langsung dari elemen `&lt;div&gt;`?",
            options: ["div p", "div > p", "div + p", "div ~ p"],
            answer: "div > p"
          },
          {
            question: "Bagaimana cara memilih elemen dengan ID 'header'?",
            options: [".header", "#header", "header", "*header"],
            answer: "#header"
          },
          {
            question: "Properti CSS mana yang digunakan untuk mengatur spasi antara huruf dalam sebuah teks?",
            options: ["word-spacing", "line-height", "letter-spacing", "text-indent"],
            answer: "letter-spacing"
          },
          {
            question: "Apa fungsi dari pseudo-class `:hover`?",
            options: [
              "Memilih elemen yang sedang aktif diklik",
              "Memilih elemen yang sedang dikunjungi",
              "Memilih elemen saat mouse menunjuk ke atasnya",
              "Memilih elemen yang fokus"
            ],
            answer: "Memilih elemen saat mouse menunjuk ke atasnya"
          }
        ]
      }
    ]
  },
  // ... Jika ada kursus lain, tambahkan di sini
  {
    id: 2,
    title: "React untuk Pemula",
    description:
      "Kuasai React dari dasar hingga mampu membangun aplikasi web modern yang interaktif dan efisien! Dalam kursus ini, kamu akan belajar cara kerja komponen, penggunaan JSX, pengelolaan state dan props, hingga navigasi menggunakan React Router. Sangat cocok bagi yang ingin terjun ke dunia frontend development berbasis JavaScript.",
    image: '/images/react.jpg', // Path ke gambar di folder public
    category: "Frontend",
    price: "Rp 150.000",
    syllabus: [
      {
        title: "Pengenalan React",
        content:
          "Mengenal konsep dasar React, cara kerja virtual DOM, komponen fungsional, dan JSX.",
      },
      {
        title: "State dan Props",
        content:
          "Belajar mengelola dan berbagi data antar komponen menggunakan state dan props.",
      },
      {
        title: "Routing",
        content:
          "Implementasi navigasi antar halaman dalam aplikasi menggunakan React Router.",
      },
    ],
    mentor: "Ilham Nursamsi, S.Kom, M.Ilkom.",
    mentorImage: '/images/ilham.jpg', // Path ke gambar di folder public
    mentorBio:
      "Ilham adalah seorang Frontend Engineer berpengalaman yang mengkhususkan pada pengembangan antarmuka modern dengan React. Ia aktif membagikan ilmunya melalui workshop dan mentoring di berbagai komunitas teknologi.",
    lessons: [
      {
        id: 1,
        title: "Pelajaran 1: Pengenalan React dan Lingkungan",
        type: "text", // Diubah dari 'video' menjadi 'text'
        duration: "15:30 (baca)",
        content: "React adalah library JavaScript untuk membangun antarmuka pengguna (UI). Dibuat oleh Facebook, React memungkinkan pengembang untuk membuat aplikasi web yang kompleks dari komponen-komponen kecil dan terisolasi. Pelajari mengapa React populer dan cara menyiapkan lingkungan pengembangan React pertama Anda."
      },
      {
        id: 2,
        title: "Pelajaran 2: JSX dan Komponen Fungsional",
        type: "text",
        duration: "10:00 (baca)",
        content: "Materi teks yang menjelaskan sintaks JSX dan bagaimana membuat komponen fungsional pertama Anda di React. JSX adalah ekstensi sintaks JavaScript yang memungkinkan Anda menulis struktur UI seperti HTML di dalam file JavaScript."
      },
      {
        id: 3,
        title: "Pelajaran 3: Mengelola State dengan useState Hook",
        type: "text", // Diubah dari 'video' menjadi 'text'
        duration: "20:00 (baca)",
        content: "Pelajari secara mendalam tentang `useState` hook untuk mengelola state lokal dalam komponen React. State memungkinkan komponen Anda 'mengingat' data yang dapat berubah seiring waktu, seperti input pengguna atau data yang diambil dari API."
      },
      {
        id: 4,
        title: "Pelajaran 4: Berbagi Data dengan Props",
        type: "text",
        duration: "12:00 (baca)",
        content: "Penjelasan tentang `props` dan bagaimana menggunakannya untuk meneruskan data antar komponen. Props adalah argumen yang diteruskan ke komponen React, memungkinkan komunikasi satu arah dari komponen induk ke komponen anak."
      },
      {
        id: 5,
        title: "Kuis: Dasar-dasar React",
        type: "quiz",
        duration: "5:00",
        content: "Uji pemahaman Anda tentang konsep dasar React yang telah dipelajari.",
        quizQuestions: [ // Menambahkan pertanyaan kuis yang hilang
          {
            question: "Apa fungsi utama React?",
            options: ["Membangun database", "Membangun antarmuka pengguna", "Mengelola server backend", "Membuat animasi 3D"],
            answer: "Membangun antarmuka pengguna"
          },
          {
            question: "Apa itu JSX dalam konteks React?",
            options: ["Sebuah bahasa pemrograman baru", "Ekstensi sintaks JavaScript untuk menulis UI", "Sebuah framework CSS", "Sebuah alat debugging React"],
            answer: "Ekstensi sintaks JavaScript untuk menulis UI"
          },
          {
            question: "Hook mana yang digunakan untuk menambahkan state ke komponen fungsional?",
            options: ["useEffect", "useContext", "useState", "useReducer"],
            answer: "useState"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Desain UI/UX dengan Figma",
    description:
      "Pelajari cara mendesain antarmuka pengguna (UI) yang estetis dan pengalaman pengguna (UX) yang optimal menggunakan Figma. Kursus ini membimbingmu memahami prinsip dasar UI/UX, tools di Figma, hingga pembuatan prototype interaktif yang siap dipresentasikan atau diuji.",
    image: '/images/ui ux.jpg', // Path ke gambar di folder public
    category: "UI/UX Design",
    price: "Rp 120.000",
    syllabus: [
      {
        title: "Pengenalan Figma",
        content:
          "Mengenal antarmuka Figma, fitur dasar, serta kolaborasi desain secara real-time.",
      },
      {
      title: "Prinsip UI/UX",
        content:
          "Mempelajari prinsip desain visual, hierarki, konsistensi, dan desain yang berpusat pada pengguna.",
      },
      {
        title: "Prototyping",
        content:
          "Membuat prototype interaktif untuk presentasi, user testing, dan validasi ide desain.",
      },
    ],
    mentor: "Muhyi Hidayah, S.Kom, MT",
    mentorImage: '/images/foto muhy.jpg', // Path ke gambar di folder public
    mentorBio:
      "Muhyi adalah desainer UI/UX profesional dengan pengalaman bertahun-tahun di industri startup dan teknologi digital. Ia juga aktif sebagai mentor desain di berbagai komunitas kreatif.",
    lessons: [
      {
        id: 301,
        title: "Pelajaran 1: Antarmuka Figma",
        type: "text", // Diubah dari 'video' menjadi 'text'
        duration: "10:00 (baca)",
        content: "Mengenal antarmuka Figma, sebuah alat desain berbasis web yang kuat untuk UI/UX. Pelajari tentang kanvas, panel layer, panel properti, dan bagaimana menavigasi di dalamnya."
      },
      {
        id: 302,
        title: "Pelajaran 2: Alat Dasar Figma",
        type: "text",
        duration: "15:00 (baca)",
        content: "Materi teks tentang penggunaan alat dasar Figma seperti Frame, Shape (persegi, lingkaran, dll.), Text, dan Pen tool. Kuasai alat-alat ini untuk mulai membuat desain Anda."
      },
      {
        id: 303,
        title: "Kuis: Dasar-dasar Figma",
        type: "quiz",
        duration: "8:00",
        content: "Uji pemahaman Anda tentang antarmuka dan alat dasar Figma.",
        quizQuestions: [
          {
            question: "Fitur Figma mana yang memungkinkan kolaborasi real-time?",
            options: ["Plugins", "Comments", "Sharing", "Prototyping"],
            answer: "Sharing"
          },
          {
            question: "Apa fungsi utama dari 'Frame' di Figma?",
            options: ["Menggambar bentuk bebas", "Membuat area desain yang responsif", "Menyimpan aset gambar", "Menambahkan teks"],
            answer: "Membuat area desain yang responsif"
          },
          {
            question: "Alat mana yang digunakan untuk membuat garis dan bentuk kustom di Figma?",
            options: ["Rectangle tool", "Pen tool", "Text tool", "Move tool"],
            answer: "Pen tool"
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "HTML Dasar",
    description:
      "Panduan cepat dan mudah untuk mempelajari HTML dari nol hingga mahir.",
    image: '/images/html dasar.jpg', // Path ke gambar di folder public
    category: "Frontend",
    price: "Gratis",
    syllabus: [
      { title: "Pengenalan HTML", content: "Memahami struktur dasar HTML dan fungsinya." },
      { title: "HTML Elements", content: "Memahami tag, atribut, dan konten HTML." },
      { title: "HTML Forms", content: "Membuat form interaktif menggunakan elemen form." },
    ],
    mentor: "Ilham Nursamsi, S.Kom., M.Ilkom",
    mentorImage: '/images/ilham.jpg', // Path ke gambar di folder public
    mentorBio:
      "Ilham adalah frontend developer profesional dengan pengalaman kerja internasional.",
    lessons: [
      {
        id: 401,
        title: "Pelajaran 1: Pengenalan dan Sejarah HTML",
        type: "text", // Diubah dari 'video' menjadi 'text'
        duration: "8:00 (baca)",
        content: "Pelajari sejarah singkat HTML dan perannya dalam pengembangan web. HTML adalah tulang punggung setiap halaman web, menyediakan struktur konten."
      },
      {
        id: 402,
        title: "Pelajaran 2: Struktur Dokumen HTML",
        type: "text",
        duration: "7:00 (baca)",
        content: "Penjelasan tentang `<!DOCTYPE html>`, `<html>`, `<head>`, dan `<body>`. Pahami bagaimana elemen-elemen ini bekerja sama untuk membentuk dokumen HTML yang valid."
      },
      {
        id: 403,
        title: "Kuis: HTML Dasar",
        type: "quiz",
        duration: "5:00",
        content: "Uji pemahaman Anda tentang struktur dan elemen dasar HTML.",
        quizQuestions: [
          {
            question: "Tag HTML mana yang digunakan untuk membuat tautan?",
            options: ["<link>", "<a>", "<url>", "<href>"],
            answer: "<a>"
          },
          {
            question: "Atribut `src` pada tag `<img>` digunakan untuk apa?",
            options: ["Menentukan ukuran gambar", "Menentukan lokasi gambar", "Menentukan judul gambar", "Menentukan gaya gambar"],
            answer: "Menentukan lokasi gambar"
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "CSS Dasar",
    description:
      "Pelajari cara membuat tampilan website menarik, rapi, dan responsif menggunakan CSS.",
    image: '/images/css.jpg', // Path ke gambar di folder public
    category: "Frontend",
    price: "Gratis",
    syllabus: [
      { title: "Introduction to CSS", content: "Sintaks CSS, cara kerja, dan penggunaan selector." },
      { title: "Box Model", content: "Konsep padding, margin, border, dan konten." },
      { title: "Layout with CSS", content: "Teknik layout menggunakan Flexbox dan Grid." },
    ],
    mentor: "Muhyi Hidayah, S.Kom., M.T.",
    mentorImage: '/images/foto muhy.jpg', // Path ke gambar di folder public
    mentorBio:
      "Muhyi adalah frontend designer profesional yang dikenal sebagai desainer utama situs Cortex di Indonesia.",
    lessons: [
      {
        id: 501,
        title: "Pelajaran 1: Apa itu CSS?",
        type: "text", // Diubah dari 'video' menjadi 'text'
        duration: "9:00 (baca)",
        content: "CSS (Cascading Style Sheets) adalah bahasa stylesheet yang digunakan untuk mendeskripsikan presentasi dokumen yang ditulis dalam markup language seperti HTML. CSS mendeskripsikan bagaimana elemen harus dirender di layar, di kertas, atau di media lain."
      },
      {
        id: 502,
        title: "Pelajaran 2: Cara Menulis CSS",
        type: "text",
        duration: "10:00 (baca)",
        content: "Penjelasan tentang inline, internal, dan external CSS. Pelajari metode terbaik untuk menyertakan CSS ke dalam proyek web Anda."
      },
      {
        id: 503,
        title: "Kuis: CSS Dasar",
        type: "quiz",
        duration: "5:00",
        content: "Uji pemahaman Anda tentang sintaks dan metode penulisan CSS.",
        quizQuestions: [
          {
            question: "Properti CSS mana yang digunakan untuk mengatur jarak antara konten elemen dan batasnya?",
            options: ["margin", "border", "padding", "outline"],
            answer: "padding"
          },
          {
            question: "Selector CSS mana yang digunakan untuk menargetkan elemen dengan ID unik?",
            options: [".class", "#id", "element", "*"],
            answer: "#id"
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Belajar Pemrograman Python",
    description: "Cocok untuk pemula yang ingin masuk ke dunia pemrograman dengan Python.",
    image: '/images/python.jpg', // Path ke gambar di folder public
    category: "Programming",
    price: "Rp 100.000",
    syllabus: [
      {
        title: "Introduction to Python",
        content: "Mengenal sintaks dasar Python dan tipe data umum.",
      },
      { title: "Control Flow", content: "Menggunakan perulangan dan percabangan." },
      { title: "Functions", content: "Membuat dan menggunakan fungsi dalam program." },
    ],
    mentor: "Fadli Zaenal Aripin, S.Kom., M.S.",
    mentorImage: '/images/foto fadli.jpg', // Path ke gambar di folder public
    mentorBio: "Fadli adalah profesional di bidang data science dengan keahlian mendalam dalam Python.",
    lessons: [
      {
        id: 1,
        title: "Pelajaran 1: Dasar-dasar Python dan Instalasi",
        type: "text", // Diubah dari 'video' menjadi 'text'
        duration: "10:00 (baca)",
        content: "Pelajari dasar-dasar bahasa pemrograman Python, mengapa ia populer, dan langkah-langkah untuk menginstal Python di sistem operasi Anda. Anda juga akan belajar cara menjalankan kode Python pertama Anda."
      },
      {
        id: 2,
        title: "Pelajaran 2: Variabel dan Tipe Data",
        type: "text",
        duration: "8:00 (baca)",
        content: "Materi teks tentang bagaimana mendeklarasikan variabel, tipe data dasar seperti integer, float, string, boolean, dan cara menggunakannya dalam program Python."
      },
      {
        id: 3,
        title: "Pelajaran 3: Operator dan Ekspresi",
        type: "text", // Diubah dari 'video' menjadi 'text'
        duration: "12:00 (baca)",
        content: "Pelajari berbagai operator aritmatika, perbandingan, dan logika dalam Python, serta bagaimana menggunakannya untuk membuat ekspresi yang kompleks dalam kode Anda."
      },
      {
        id: 4,
        title: "Latihan: Membuat Program Python Pertama Anda",
        type: "text", // Diubah dari 'exercise' menjadi 'text'
        duration: "30:00 (latihan)",
        content: "Latihan praktik untuk mengaplikasikan semua konsep yang telah dipelajari sejauh ini. Anda akan membuat program sederhana untuk menghitung BMI (Body Mass Index) menggunakan input pengguna dan menampilkan hasilnya."
      },
      {
        id: 5,
        title: "Kuis: Dasar-dasar Python",
        type: "quiz",
        duration: "10:00",
        content: "Uji pemahaman Anda tentang dasar-dasar pemrograman Python.",
        quizQuestions: [
          {
            question: "Sintaks Python mana yang benar untuk mencetak 'Halo Dunia'?",
            options: ["print('Halo Dunia')", "console.log('Halo Dunia')", "echo 'Halo Dunia'", "System.out.println('Halo Dunia')"],
            answer: "print('Halo Dunia')"
          },
          {
            question: "Tipe data mana yang digunakan untuk menyimpan angka desimal di Python?",
            options: ["int", "str", "float", "bool"],
            answer: "float"
          }
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Data Analyst",
    description:
      "Pelajari dasar-dasar analisis data menggunakan Excel dan SQL untuk pengambilan keputusan berbasis data.",
    image: '/images/data analyst.jpg', // Path ke gambar di folder public
    category: "Data",
    price: "Rp 200.000",
    syllabus: [
      {
        title: "Introduction to Data Analysis",
        content: "Langkah-langkah dalam proses analisis data.",
      },
      {
        title: "Data Manipulation with Excel",
        content: "Menggunakan formula dan fungsi untuk mengolah data.",
      },
      { title: "Database with SQL", content: "Menulis kueri SQL untuk pengambilan data." },
    ],
    mentor: "Ilham Nursamsi, S.Kom., M.Ilkom",
    mentorImage: '/images/ilham.jpg', // Path ke gambar di folder public
    mentorBio: "Ilham adalah data analyst profesional dengan pengalaman luas dalam proyek lokal dan internasional.",
    lessons: [
      {
        id: 701,
        title: "Pelajaran 1: Pengantar Analisis Data",
        type: "text", // Diubah dari 'video' menjadi 'text'
        duration: "15:00 (baca)",
        content: "Analisis data adalah proses memeriksa, membersihkan, mengubah, dan memodelkan data dengan tujuan menemukan informasi yang berguna, menyimpulkan kesimpulan, dan mendukung pengambilan keputusan. Pelajari langkah-langkah kunci dalam proses analisis data."
      },
      {
        id: 702,
        title: "Pelajaran 2: Fungsi Dasar Excel untuk Data",
        type: "text",
        duration: "20:00 (baca)",
        content: "Panduan penggunaan VLOOKUP, SUMIF, COUNTIF, dan fungsi Excel penting lainnya untuk manipulasi dan analisis data. Excel adalah alat yang kuat untuk data awal."
      },
      {
        id: 703,
        title: "Kuis: Dasar-dasar Analisis Data",
        type: "quiz",
        duration: "10:00",
        content: "Uji pemahaman Anda tentang konsep dasar analisis data dan penggunaan Excel.",
        quizQuestions: [
          {
            question: "Fungsi Excel mana yang digunakan untuk mencari nilai dalam tabel berdasarkan nilai pencarian?",
            options: ["SUM", "AVERAGE", "VLOOKUP", "IF"],
            answer: "VLOOKUP"
          },
          {
            question: "Apa tujuan utama dari analisis data?",
            options: ["Mengumpulkan data mentah", "Menemukan informasi yang berguna untuk pengambilan keputusan", "Membuat grafik yang indah", "Menyimpan data di database"],
            answer: "Menemukan informasi yang berguna untuk pengambilan keputusan"
          }
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Machine Learning",
    description:
      "Pelajari konsep dasar Machine Learning dan bangun model sederhana untuk mengenali pola dari data.",
    image: '/images/machine learning.jpg', // Path ke gambar di folder public
    category: "AI",
    price: "Rp 250.000",
    syllabus: [
      {
        title: "Introduction to Machine Learning",
        content: "Jenis-jenis machine learning dan aplikasinya.",
      },
      {
        title: "Supervised Learning",
        content: "Model regresi dan klasifikasi dengan data berlabel.",
      },
      { title: "Unsupervised Learning", content: "Clustering untuk data tanpa label." },
    ],
    mentor: "Fadli Zaenal Aripin, S.Kom., M.S.",
    mentorImage: '/images/foto fadli.jpg', // Path ke gambar di folder public
    mentorBio: "Fadli adalah praktisi Machine Learning dengan fokus pada penerapan model AI dalam dunia nyata.",
    lessons: [
      {
        id: 801,
        title: "Pelajaran 1: Konsep Dasar Machine Learning",
        type: "text", // Diubah dari 'video' menjadi 'text'
        duration: "20:00 (baca)",
        content: "Machine Learning adalah bidang AI yang memungkinkan sistem untuk belajar dari data tanpa diprogram secara eksplisit. Pelajari jenis-jenis utama Machine Learning: Supervised, Unsupervised, dan Reinforcement Learning."
      },
      {
        id: 802,
        title: "Pelajaran 2: Regresi Linear Sederhana",
        type: "text",
        duration: "25:00 (baca)",
        content: "Penjelasan matematis dan implementasi dasar model Regresi Linear Sederhana. Ini adalah salah satu algoritma Machine Learning yang paling dasar untuk memprediksi nilai numerik."
      },
      {
        id: 803,
        title: "Kuis: Pengantar Machine Learning",
        type: "quiz",
        duration: "15:00",
        content: "Uji pemahaman Anda tentang konsep dasar dan algoritma Machine Learning.",
        quizQuestions: [
          {
            question: "Apa perbedaan utama antara Supervised Learning dan Unsupervised Learning?",
            options: ["Supervised Learning menggunakan data berlabel, Unsupervised Learning tidak.", "Supervised Learning lebih cepat dari Unsupervised Learning.", "Unsupervised Learning selalu lebih akurat.", "Tidak ada perbedaan signifikan."],
            answer: "Supervised Learning menggunakan data berlabel, Unsupervised Learning tidak."
          },
          {
            question: "Algoritma Machine Learning mana yang digunakan untuk memprediksi nilai numerik kontinu?",
            options: ["Klasifikasi", "Clustering", "Regresi", "Reinforcement"],
            answer: "Regresi"
          }
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Data Science",
    description:
      "Gabungkan statistik, pemrograman, dan analisis data untuk menggali insight mendalam dan membangun solusi berbasis data.",
    image: '/images/data science.jpg', // Path ke gambar di folder public
    category: "Data",
    price: "Rp 300.000",
    syllabus: [
      {
        title: "Introduction to Data Science",
        content: "Alur kerja data science dari awal hingga deployment.",
      },
      { title: "Data Visualization", content: "Teknik dan tools untuk visualisasi data." },
      { title: "Statistical Analysis", content: "Analisis statistik untuk pengambilan keputusan." },
    ],
    mentor: "Fadli Zaenal Aripin, S.Kom., M.S.",
    mentorImage: '/images/foto fadli.jpg', // Path ke gambar di folder public
    mentorBio:
      "Fadli adalah data scientist yang ahli dalam mengolah data kompleks menjadi informasi yang dapat ditindaklanjutif.",
    lessons: [
      {
        id: 901,
        title: "Pelajaran 1: Pengantar Data Science",
        type: "text", // Diubah dari 'video' menjadi 'text'
        duration: "25:00 (baca)",
        content: "Data Science adalah bidang interdisipliner yang menggunakan metode ilmiah, proses, algoritma, dan sistem untuk mengekstrak pengetahuan dan wawasan dari data dalam berbagai bentuk. Pelajari alur kerja data science dari pengumpulan data hingga deployment model."
      },
      {
        id: 902,
        title: "Pelajaran 2: Visualisasi Data dengan Matplotlib",
        type: "text",
        duration: "30:00 (baca)",
        content: "Tutorial penggunaan library Matplotlib di Python untuk membuat berbagai jenis visualisasi data seperti grafik garis, batang, scatter plot, dan histogram. Visualisasi data adalah kunci untuk memahami pola dalam data."
      },
      {
        id: 903,
        title: "Kuis: Dasar-dasar Data Science",
        type: "quiz",
        duration: "15:00",
        content: "Uji pemahaman Anda tentang konsep dasar dan alat dalam Data Science.",
        quizQuestions: [
          {
            question: "Apa peran utama visualisasi data dalam Data Science?",
            options: ["Menyimpan data", "Mengubah data mentah menjadi informasi yang mudah dipahami", "Melakukan perhitungan statistik", "Mengembangkan algoritma Machine Learning"],
            answer: "Mengubah data mentah menjadi informasi yang mudah dipahami"
          },
          {
            question: "Bahasa pemrograman mana yang paling sering digunakan dalam Data Science?",
            options: ["Java", "C++", "Python", "PHP"],
            answer: "Python"
          }
        ]
      }
    ]
  },
];