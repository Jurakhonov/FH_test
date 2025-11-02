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
      image_url: "https://source.unsplash.com/800x600/?movie",
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
      title: "Симфонический оркестр",
      category: 2,
      description: "Классическая музыка в современном исполнении",
      image_url: "https://source.unsplash.com/800x600/?orchestra",
      duration: 120,
    },
    {
      id: 4,
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
      available_seats: 45,
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
      event: { id: 3, title: "Симфонический оркестр" },
      start_time: "2025-11-03T19:00:00",
      price: 2000,
      available_seats: 100,
      total_seats: 120,
      is_sold_out: false,
    },
    {
      id: 5,
      event: { id: 4, title: "Ромео и Джульетта" },
      start_time: "2025-11-04T18:00:00",
      price: 1800,
      available_seats: 30,
      total_seats: 40,
      is_sold_out: false,
    },
  ],
  seats: {
    rows: 5,
    cols: 10,
    seats: Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      row: Math.floor(index / 10) + 1,
      number: (index % 10) + 1,
      type:
        index < 20
          ? "econom"
          : index < 35
          ? "standard"
          : index < 45
          ? "premium"
          : "vip",
      reserved: Math.random() > 0.8,
    })),
  },
};
