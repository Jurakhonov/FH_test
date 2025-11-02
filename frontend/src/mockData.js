// Centralized mock data and seat generator for frontend components
export const mockData = {
  categories: [
    { id: 1, name: "Фильмы", slug: "movies" },
    { id: 2, name: "Концерты", slug: "concerts" },
    { id: 3, name: "Театр", slug: "theater" },
  ],

  events: [
    { id: 1, title: "Оппенгеймер", category: 1, description: "История жизни Роберта Оппенгеймера", image_url: "https://source.unsplash.com/800x600/?oppenheimer", duration: 180 },
    { id: 2, title: "Барби", category: 1, description: "Приключения в мире Барби", image_url: "https://source.unsplash.com/800x600/?barbie", duration: 120 },
    { id: 3, title: "Наполеон", category: 1, description: "Исторический эпос", image_url: "https://source.unsplash.com/800x600/?napoleon", duration: 158 },
    { id: 4, title: "Переводчик", category: 1, description: "Военный триллер", image_url: "https://source.unsplash.com/800x600/?translator", duration: 124 },
    { id: 5, title: "Симфонический оркестр", category: 2, description: "Классическая музыка", image_url: "https://source.unsplash.com/800x600/?orchestra", duration: 120 },
    { id: 6, title: "Ромео и Джульетта", category: 3, description: "Шекспир: классика", image_url: "https://source.unsplash.com/800x600/?romeo,juliet,theater", duration: 150 },
    { id: 7, title: "Интерстеллар", category: 1, description: "Научно-фантастический эпос", image_url: "https://source.unsplash.com/800x600/?interstellar", duration: 169 },
    { id: 8, title: "Дюна", category: 1, description: "Фантастика по Герберту", image_url: "https://source.unsplash.com/800x600/?dune", duration: 155 },
    { id: 9, title: "Rock Night: The Beats", category: 2, description: "Рок-концерт", image_url: "https://source.unsplash.com/800x600/?rock,concert", duration: 120 },
    { id: 10, title: "Jazz Night", category: 2, description: "Джазовый вечер", image_url: "https://source.unsplash.com/800x600/?jazz,concert", duration: 100 },
    { id: 11, title: "Гамлет", category: 3, description: "Трагедия Шекспира", image_url: "https://source.unsplash.com/800x600/?hamlet,theater", duration: 160 },
    { id: 12, title: "Щелкунчик", category: 3, description: "Балет", image_url: "https://source.unsplash.com/800x600/?nutcracker,ballet", duration: 140 },
  ],

  // sessions: provide available_seats and total_seats (generateSeats uses available_seats to compute reserved)
  sessions: [
    { id: 1, event: { id: 1, title: "Оппенгеймер" }, start_time: "2025-11-02T18:00:00", price: 1500, available_seats: 35, total_seats: 50 },
    { id: 2, event: { id: 1, title: "Оппенгеймер" }, start_time: "2025-11-02T21:00:00", price: 1500, available_seats: 0, total_seats: 50 },
    { id: 3, event: { id: 2, title: "Барби" }, start_time: "2025-11-02T19:00:00", price: 1200, available_seats: 8, total_seats: 50 },
    { id: 4, event: { id: 3, title: "Наполеон" }, start_time: "2025-11-02T17:00:00", price: 1700, available_seats: 42, total_seats: 50 },
    { id: 5, event: { id: 3, title: "Наполеон" }, start_time: "2025-11-02T20:30:00", price: 1800, available_seats: 15, total_seats: 50 },
    { id: 6, event: { id: 4, title: "Переводчик" }, start_time: "2025-11-02T19:00:00", price: 1600, available_seats: 48, total_seats: 50 },
    { id: 7, event: { id: 4, title: "Переводчик" }, start_time: "2025-11-02T21:30:00", price: 1400, available_seats: 50, total_seats: 50 },
    { id: 8, event: { id: 5, title: "Симфонический оркестр" }, start_time: "2025-11-03T19:00:00", price: 2000, available_seats: 100, total_seats: 120 },
    { id: 9, event: { id: 6, title: "Ромео и Джульетта" }, start_time: "2025-11-04T18:00:00", price: 1800, available_seats: 30, total_seats: 40 },
    { id: 10, event: { id: 7, title: "Интерстеллар" }, start_time: "2025-11-03T20:00:00", price: 1400, available_seats: 40, total_seats: 45 },
    { id: 11, event: { id: 7, title: "Интерстеллар" }, start_time: "2025-11-03T23:00:00", price: 1400, available_seats: 10, total_seats: 45 },
    { id: 12, event: { id: 8, title: "Дюна" }, start_time: "2025-11-04T18:30:00", price: 1550, available_seats: 22, total_seats: 45 },
    { id: 13, event: { id: 9, title: "Rock Night: The Beats" }, start_time: "2025-11-05T19:00:00", price: 2000, available_seats: 180, total_seats: 216 },
    { id: 14, event: { id: 10, title: "Jazz Night" }, start_time: "2025-11-06T20:00:00", price: 1200, available_seats: 90, total_seats: 104 },
    { id: 15, event: { id: 11, title: "Гамлет" }, start_time: "2025-11-07T18:00:00", price: 1600, available_seats: 95, total_seats: 104 },
    { id: 16, event: { id: 12, title: "Щелкунчик" }, start_time: "2025-12-24T19:00:00", price: 1700, available_seats: 80, total_seats: 104 },
    { id: 17, event: { id: 9, title: "Rock Night: The Beats" }, start_time: "2025-11-05T22:00:00", price: 2100, available_seats: 50, total_seats: 216 },
    { id: 18, event: { id: 10, title: "Jazz Night" }, start_time: "2025-11-06T22:30:00", price: 1100, available_seats: 30, total_seats: 104 },
    { id: 19, event: { id: 8, title: "Дюна" }, start_time: "2025-11-04T21:00:00", price: 1550, available_seats: 5, total_seats: 45 },
    { id: 20, event: { id: 11, title: "Гамлет" }, start_time: "2025-11-07T21:00:00", price: 1650, available_seats: 0, total_seats: 104 },
  ],

  // venue layouts describe rows/cols, aisle columns and seat type regions
  venueLayouts: {
    cinema: {
      rows: 5,
      cols: 10,
      hasScreen: true,
      aisleAfterCols: [5],
      seatTypes: [
        { rows: [1, 2], type: "econom" },
        { rows: [3, 4], type: "standard" },
        { rows: [5], type: "premium" },
      ],
    },
    theater: {
      rows: 8,
      cols: 13,
      hasStage: true,
      aisleAfterCols: [4, 9],
      seatTypes: [
        { rows: [1, 2, 3], type: "econom" },
        { rows: [4, 5, 6], type: "standard" },
        { rows: [7, 8], type: "premium" },
      ],
    },
    concert: {
      rows: 12,
      cols: 18,
      hasStage: true,
      aisleAfterCols: [6, 12],
      seatTypes: [
        { rows: [1, 2, 3, 4], type: "econom" },
        { rows: [5, 6, 7, 8], type: "standard" },
        { rows: [9, 10], type: "premium" },
        { rows: [11, 12], type: "vip" },
      ],
    },
  },

  // generateSeats(sessionId): creates seats array and randomizes reserved seats so
  // that reservedCount = seatCount - session.available_seats.
  generateSeats: function (sessionId) {
    const session = this.sessions.find((s) => s.id === sessionId);
    if (!session) return null;

    const event = this.events.find((e) => e.id === session.event.id);
    let venueType = "cinema";
    if (event && event.category === 2) venueType = "concert";
    if (event && event.category === 3) venueType = "theater";

    const layout = this.venueLayouts[venueType];
    if (!layout) return { seats: [], rows: 0, cols: 0 };

    // Build positional list skipping aisle columns (aisles are after certain cols)
    const positions = [];
    for (let row = 1; row <= layout.rows; row++) {
      for (let col = 1; col <= layout.cols; col++) {
        // If column is an aisle break (i.e., an empty space after this column), we still include the seat at that column.
        // We only skip columns if layout explicitly marks them as removed. Here we treat aisleAfterCols as a visual gap after the given column.
        positions.push({ row, col });
      }
    }

    // To simulate aisles (gaps), we'll mark seats as non-renderable by a separate field later in UI if needed.
    // For seat counting we still consider all positions, but SeatSelection's rendering can use aisleAfterCols to insert gaps.

    const seatCount = positions.length;
    const available = Math.max(0, Math.min(Number(session.available_seats || 0), seatCount));
    const reservedCount = Math.max(0, seatCount - available);

    // Create seats with default unreserved
    const seats = positions.map((pos, idx) => {
      let type = "standard";
      for (const st of layout.seatTypes || []) {
        if (st.rows && st.rows.includes(pos.row)) {
          type = st.type;
          break;
        }
      }
      return { id: idx + 1, row: pos.row, col: pos.col, type, reserved: false };
    });

    // Randomly pick reservedCount seats (Fisher-Yates shuffle on indices)
    if (reservedCount > 0 && seats.length > 0) {
      const idxs = seats.map((_, i) => i);
      for (let i = idxs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
      }
      const reservedIdxs = idxs.slice(0, reservedCount);
      for (const i of reservedIdxs) seats[i].reserved = true;
    }

    return {
      rows: layout.rows,
      cols: layout.cols,
      hasScreen: !!layout.hasScreen,
      hasStage: !!layout.hasStage,
      aisleAfterCols: layout.aisleAfterCols,
      seats,
    };
  },
};

export default mockData;
export const mockData = {
  categories: [
    { id: 1, name: "Фильмы", slug: "movies" },
    { id: 2, name: "Концерты", slug: "concerts" },
    { id: 3, name: "Театр", slug: "theater" },
  ],

  events: [
    { id: 1, title: "Оппенгеймер", category: 1, description: "История жизни американского физика-теоретика Роберта Оппенгеймера", image_url: "https://source.unsplash.com/800x600/?oppenheimer", duration: 180 },
    { id: 2, title: "Барби", category: 1, description: "Увлекательное приключение в мире Барби", image_url: "https://source.unsplash.com/800x600/?barbie", duration: 120 },
    { id: 3, title: "Наполеон", category: 1, description: "Исторический эпос о жизни и завоеваниях Наполеона Бонапарта", image_url: "https://source.unsplash.com/800x600/?napoleon", duration: 158 },
    { id: 4, title: "Переводчик", category: 1, description: "Захватывающий триллер о военном переводчике", image_url: "https://source.unsplash.com/800x600/?translator", duration: 124 },
    { id: 5, title: "Симфонический оркестр", category: 2, description: "Классическая музыка в современном исполнении", image_url: "https://source.unsplash.com/800x600/?orchestra", duration: 120 },
    { id: 6, title: "Ромео и Джульетта", category: 3, description: "Классическая постановка Шекспира", image_url: "https://source.unsplash.com/800x600/?theater", duration: 150 },
    { id: 7, title: "Интерстеллар", category: 1, description: "Эпическое научно-фантастическое путешествие", image_url: "https://source.unsplash.com/800x600/?interstellar", duration: 169 },
    { id: 8, title: "Дюна", category: 1, description: "Фантастический эпос по роману Фрэнка Герберта", image_url: "https://source.unsplash.com/800x600/?dune", duration: 155 },
    { id: 9, title: "Rock Night: The Beats", category: 2, description: "Рок-концерт на открытом пространстве", image_url: "https://source.unsplash.com/800x600/?rock,concert", duration: 120 },
    { id: 10, title: "Jazz Night", category: 2, description: "Интимный джазовый вечер", image_url: "https://source.unsplash.com/800x600/?jazz,concert", duration: 100 },
    { id: 11, title: "Гамлет", category: 3, description: "Трагедия Шекспира", image_url: "https://source.unsplash.com/800x600/?hamlet,theater", duration: 160 },
    { id: 12, title: "Щелкунчик", category: 3, description: "Классический балет к праздничному сезону", image_url: "https://source.unsplash.com/800x600/?nutcracker,ballet", duration: 140 },
  ],

  sessions: [
    { id: 1, event: { id: 1, title: "Оппенгеймер" }, start_time: "2025-11-02T18:00:00", price: 1500, available_seats: 35, total_seats: 45, is_sold_out: false },
    { id: 2, event: { id: 1, title: "Оппенгеймер" }, start_time: "2025-11-02T21:00:00", price: 1500, available_seats: 0, total_seats: 45, is_sold_out: true },
    { id: 3, event: { id: 2, title: "Барби" }, start_time: "2025-11-02T19:00:00", price: 1200, available_seats: 8, total_seats: 45, is_sold_out: false },
    { id: 4, event: { id: 3, title: "Наполеон" }, start_time: "2025-11-02T17:00:00", price: 1700, available_seats: 42, total_seats: 45, is_sold_out: false },
    { id: 5, event: { id: 3, title: "Наполеон" }, start_time: "2025-11-02T20:30:00", price: 1800, available_seats: 15, total_seats: 45, is_sold_out: false },
    { id: 6, event: { id: 4, title: "Переводчик" }, start_time: "2025-11-02T19:00:00", price: 1600, available_seats: 48, total_seats: 50, is_sold_out: false },
    { id: 7, event: { id: 4, title: "Переводчик" }, start_time: "2025-11-02T21:30:00", price: 1400, available_seats: 50, total_seats: 50, is_sold_out: false },
    { id: 8, event: { id: 5, title: "Симфонический оркестр" }, start_time: "2025-11-03T19:00:00", price: 2000, available_seats: 100, total_seats: 120, is_sold_out: false },
    { id: 9, event: { id: 6, title: "Ромео и Джульетта" }, start_time: "2025-11-04T18:00:00", price: 1800, available_seats: 30, total_seats: 40, is_sold_out: false },
    { id: 10, event: { id: 7, title: "Интерстеллар" }, start_time: "2025-11-03T20:00:00", price: 1400, available_seats: 40, total_seats: 45, is_sold_out: false },
    { id: 11, event: { id: 7, title: "Интерстеллар" }, start_time: "2025-11-03T23:00:00", price: 1400, available_seats: 10, total_seats: 45, is_sold_out: false },
    { id: 12, event: { id: 8, title: "Дюна" }, start_time: "2025-11-04T18:30:00", price: 1550, available_seats: 22, total_seats: 45, is_sold_out: false },
    { id: 13, event: { id: 9, title: "Rock Night: The Beats" }, start_time: "2025-11-05T19:00:00", price: 2000, available_seats: 180, total_seats: 216, is_sold_out: false },
    { id: 14, event: { id: 10, title: "Jazz Night" }, start_time: "2025-11-06T20:00:00", price: 1200, available_seats: 90, total_seats: 104, is_sold_out: false },
    { id: 15, event: { id: 11, title: "Гамлет" }, start_time: "2025-11-07T18:00:00", price: 1600, available_seats: 95, total_seats: 104, is_sold_out: false },
    { id: 16, event: { id: 12, title: "Щелкунчик" }, start_time: "2025-12-24T19:00:00", price: 1700, available_seats: 80, total_seats: 104, is_sold_out: false },
    { id: 17, event: { id: 9, title: "Rock Night: The Beats" }, start_time: "2025-11-05T22:00:00", price: 2100, available_seats: 50, total_seats: 216, is_sold_out: false },
    { id: 18, event: { id: 10, title: "Jazz Night" }, start_time: "2025-11-06T22:30:00", price: 1100, available_seats: 30, total_seats: 104, is_sold_out: false },
    { id: 19, event: { id: 8, title: "Дюна" }, start_time: "2025-11-04T21:00:00", price: 1550, available_seats: 5, total_seats: 45, is_sold_out: false },
    { id: 20, event: { id: 11, title: "Гамлет" }, start_time: "2025-11-07T21:00:00", price: 1650, available_seats: 0, total_seats: 104, is_sold_out: true },
  ],

  venueLayouts: {
    cinema: {
      rows: 5,
      cols: 10,
      hasScreen: true,
      aisleAfterCols: [5],
      seatTypes: [
        { rows: [1, 2], type: "econom" },
        { rows: [3, 4], type: "standard" },
        { rows: [5], type: "premium" },
      ],
    },
    theater: {
      rows: 8,
      cols: 15,
      hasStage: true,
      aisleAfterCols: [5, 10],
      seatTypes: [
        { rows: [1, 2, 3], type: "econom" },
        { rows: [4, 5, 6], type: "standard" },
        { rows: [7, 8], type: "premium" },
      ],
    },
    concert: {
      rows: 12,
      cols: 20,
      hasStage: true,
      aisleAfterCols: [7, 14],
      seatTypes: [
        { rows: [1, 2, 3, 4], type: "econom" },
        { rows: [5, 6, 7, 8], type: "standard" },
        { rows: [9, 10], type: "premium" },
        { rows: [11, 12], type: "vip" },
      ],
    },
  },

  generateSeats: function (sessionId) {
    const session = this.sessions.find((s) => s.id === sessionId);
    if (!session) return null;

    const event = this.events.find((e) => e.id === session.event.id);
    let venueType = "cinema";
    if (event && event.category === 2) venueType = "concert";
    if (event && event.category === 3) venueType = "theater";

    const layout = this.venueLayouts[venueType];
    if (!layout) return { seats: [], rows: 0, cols: 0 };

    const positions = [];
    for (let row = 1; row <= layout.rows; row++) {
      for (let col = 1; col <= layout.cols; col++) {
        if (layout.aisleAfterCols && layout.aisleAfterCols.includes(col)) continue;
        positions.push({ row, col });
      }
    }

    const seatCount = positions.length;
    const available = Math.max(0, Math.min(Number(session.available_seats || 0), seatCount));
    const reservedCount = Math.max(0, seatCount - available);

    const seats = positions.map((pos, idx) => {
      let type = "standard";
      for (const st of layout.seatTypes || []) {
        if (st.rows && st.rows.includes(pos.row)) {
          type = st.type;
          break;
        }
      }
      return { id: idx + 1, row: pos.row, col: pos.col, type, reserved: false };
    });

    if (reservedCount > 0 && seats.length > 0) {
      const idxs = seats.map((_, i) => i);
      for (let i = idxs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
      }
      const reserve = idxs.slice(0, reservedCount);
      for (const i of reserve) seats[i].reserved = true;
    }

    return {
      rows: layout.rows,
      cols: layout.cols,
      hasScreen: !!layout.hasScreen,
      hasStage: !!layout.hasStage,
      aisleAfterCols: layout.aisleAfterCols,
      seats,
    };
  },
};
      {
        id: 15,
        event: { id: 11, title: "Гамлет" },
        start_time: "2025-11-07T18:00:00",
        price: 1600,
        available_seats: 95,
        total_seats: 104,
        is_sold_out: false,
      },
      {
        id: 16,
        event: { id: 12, title: "Щелкунчик" },
        start_time: "2025-12-24T19:00:00",
        price: 1700,
        available_seats: 80,
        total_seats: 104,
        is_sold_out: false,
      },
      {
        id: 17,
        event: { id: 9, title: "Rock Night: The Beats" },
        start_time: "2025-11-05T22:00:00",
        price: 2100,
        available_seats: 50,
        total_seats: 216,
        is_sold_out: false,
      },
      {
        id: 18,
        event: { id: 10, title: "Jazz Night" },
        start_time: "2025-11-06T22:30:00",
        price: 1100,
        available_seats: 30,
        total_seats: 104,
        is_sold_out: false,
      },
      {
        id: 19,
        event: { id: 8, title: "Дюна" },
        start_time: "2025-11-04T21:00:00",
        price: 1550,
        available_seats: 5,
        total_seats: 45,
        is_sold_out: false,
      },
      {
        id: 20,
        event: { id: 11, title: "Гамлет" },
        start_time: "2025-11-07T21:00:00",
        price: 1650,
        available_seats: 0,
        total_seats: 104,
        is_sold_out: true,
      },
    ],
  // Конфигурации залов для разных типов событий
  venueLayouts: {
    cinema: {
      rows: 5,
      cols: 10,
      hasScreen: true,
      aisleAfterCols: [5], // проход после 5-го места
      seatTypes: [
        { rows: [1, 2], type: "econom" },
        { rows: [3, 4], type: "standard" },
        { rows: [5], type: "premium" },
      ],
    },
    theater: {
      rows: 8,
      cols: 15,
      hasStage: true,
      aisleAfterCols: [5, 10], // проходы после 5-го и 10-го места
      seatTypes: [
        { rows: [1, 2, 3], type: "econom" },
        { rows: [4, 5, 6], type: "standard" },
        { rows: [7, 8], type: "premium" },
      ],
    },
    concert: {
      rows: 12,
      cols: 20,
      hasStage: true,
      aisleAfterCols: [7, 14], // проходы после 7-го и 14-го места
      seatTypes: [
        { rows: [1, 2, 3, 4], type: "econom" },
        { rows: [5, 6, 7, 8], type: "standard" },
        { rows: [9, 10], type: "premium" },
        { rows: [11, 12], type: "vip" },
      ],
    },
  },

  // Функция для генерации мест на основе макета
  generateSeats: function (sessionId) {
    const session = this.sessions.find((s) => s.id === sessionId);
    if (!session) return null;

    // Определяем тип площадки на основе категории события
    const event = this.events.find((e) => e.id === session.event.id);
    let venueType = "cinema"; // по умолчанию
    if (event.category === 2) venueType = "concert";
    if (event.category === 3) venueType = "theater";

    const layout = this.venueLayouts[venueType];
    const totalSeats = layout.rows * layout.cols;
    const reservedCount = totalSeats - session.available_seats;

    let seats = [];
    let seatId = 1;

    for (let row = 1; row <= layout.rows; row++) {
      for (let col = 1; col <= layout.cols; col++) {
        // Пропускаем места в проходах
        if (layout.aisleAfterCols.includes(col)) continue;

        // Определяем тип места
        let type = "standard";
        for (const seatType of layout.seatTypes) {
          if (seatType.rows.includes(row)) {
            type = seatType.type;
            break;
          }
        }

        seats.push({
          id: seatId++,
          row,
          col,
          type,
          // Резервируем места равномерно по залу
          reserved: seatId <= reservedCount,
        });
      }
    }

    return {
      rows: layout.rows,
      cols: layout.cols,
      hasScreen: layout.hasScreen,
      hasStage: layout.hasStage,
      aisleAfterCols: layout.aisleAfterCols,
      seats,
    };
  },
};
