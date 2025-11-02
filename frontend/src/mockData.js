export const mockData = {
  categories: [
    { id: 1, name: "Фильмы", slug: "movies" },
    { id: 2, name: "Концерты", slug: "concerts" },
    { id: 3, name: "Театр", slug: "theater" },
  ],
  events: [
    {
      id: 1,
      title: "Оппенгеймер",
      category: 1,
      description:
        "История жизни американского физика-теоретика Роберта Оппенгеймера",
      image_url: "https://source.unsplash.com/800x600/?oppenheimer",
      duration: 180,
    },
    {
      id: 2,
      title: "Барби",
      category: 1,
      description: "Увлекательное приключение в мире Барби",
      image_url: "https://source.unsplash.com/800x600/?barbie",
      duration: 120,
    },
    {
      id: 3,
      title: "Наполеон",
      category: 1,
      description:
        "Исторический эпос о жизни и завоеваниях Наполеона Бонапарта",
      image_url: "https://source.unsplash.com/800x600/?napoleon",
      duration: 158,
    },
    {
      id: 4,
      title: "Переводчик",
      category: 1,
      description: "Захватывающий триллер о военном переводчике",
      image_url: "https://source.unsplash.com/800x600/?translator",
      duration: 124,
    },
    {
      id: 5,
      title: "Симфонический оркестр",
      category: 2,
      description: "Классическая музыка в современном исполнении",
      image_url: "https://source.unsplash.com/800x600/?orchestra",
      duration: 120,
    },
    {
      id: 6,
      title: "Ромео и Джульетта",
      category: 3,
      description: "Классическая постановка Шекспира",
      image_url: "https://source.unsplash.com/800x600/?theater",
      duration: 150,
    },
  ],
  sessions: [
    {
      id: 1,
      event: { id: 1, title: "Оппенгеймер" },
      start_time: "2025-11-02T18:00:00",
      price: 1500,
      available_seats: 35,
      total_seats: 50,
      is_sold_out: false,
    },
    {
      id: 2,
      event: { id: 1, title: "Оппенгеймер" },
      start_time: "2025-11-02T21:00:00",
      price: 1500,
      available_seats: 0,
      total_seats: 50,
      is_sold_out: true,
    },
    {
      id: 3,
      event: { id: 2, title: "Барби" },
      start_time: "2025-11-02T19:00:00",
      price: 1200,
      available_seats: 8,
      total_seats: 50,
      is_sold_out: false,
    },
    {
      id: 4,
      event: { id: 3, title: "Наполеон" },
      start_time: "2025-11-02T17:00:00",
      price: 1700,
      available_seats: 42,
      total_seats: 50,
      is_sold_out: false,
    },
    {
      id: 5,
      event: { id: 3, title: "Наполеон" },
      start_time: "2025-11-02T20:30:00",
      price: 1800,
      available_seats: 15,
      total_seats: 50,
      is_sold_out: false,
    },
    {
      id: 6,
      event: { id: 4, title: "Переводчик" },
      start_time: "2025-11-02T19:00:00",
      price: 1600,
      available_seats: 48,
      total_seats: 50,
      is_sold_out: false,
    },
    {
      id: 7,
      event: { id: 4, title: "Переводчик" },
      start_time: "2025-11-02T21:30:00",
      price: 1400,
      available_seats: 50,
      total_seats: 50,
      is_sold_out: false,
    },
    {
      id: 8,
      event: { id: 5, title: "Симфонический оркестр" },
      start_time: "2025-11-03T19:00:00",
      price: 2000,
      available_seats: 100,
      total_seats: 120,
      is_sold_out: false,
    },
    {
      id: 9,
      event: { id: 6, title: "Ромео и Джульетта" },
      start_time: "2025-11-04T18:00:00",
      price: 1800,
      available_seats: 30,
      total_seats: 40,
      is_sold_out: false,
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
