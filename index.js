import express from 'express';
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));

var nodes = [
    { name: "aaaaaaa", id: 1, x: 100, y: 100, r: 100, color: "#DB5657", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "12h 30m" },
    { name: "DHFJGHD", id: 2, x: 200, y: 200, r: 80, color: "#67BB6D", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "8h 45m" },
    { name: "JFGHDFG", id: 3, x: 300, y: 300, r: 50, color: "#3DC7C7", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "5h 15m" },
    { name: "KJGDFHD", id: 4, x: 400, y: 400, r: 100, color: "#D4DC6C", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "10h 0m" },
    { name: "DHFJGHD", id: 5, x: 500, y: 500, r: 80, color: "#9292C8", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "6h 30m" },
    { name: "JFGHDFG", id: 6, x: 600, y: 600, r: 50, color: "#60DAAC", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "3h 45m" },
    { name: "KJGDFHD", id: 7, x: 700, y: 700, r: 100, color: "#DB5657", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "9h 0m" },
    { name: "DHFJGHD", id: 8, x: 800, y: 800, r: 80, color: "#67BB6D", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "4h 15m" },
    { name: "JFGHDFG", id: 9, x: 900, y: 900, r: 50, color: "#3DC7C7", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "7h 30m" },
    { name: "KJGDFHD", id: 10, x: 100, y: 900, r: 100, color: "#D4DC6C", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "11h 15m" },
    { name: "DHFJGHD", id: 11, x: 200, y: 800, r: 50, color: "#9292C8", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "2h 45m" },
    { name: "JFGHDFG", id: 12, x: 300, y: 700, r: 50, color: "#60DAAC", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "8h 0m" },
    { name: "KJGDFHD", id: 13, x: 400, y: 600, r: 100, color: "#DB5657", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "5h 45m" },
    { name: "DHFJGHD", id: 14, x: 500, y: 500, r: 50, color: "#67BB6D", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "12h 0m" },
    { name: "JFGHDFG", id: 15, x: 600, y: 400, r: 80, color: "#3DC7C7", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "6h 15m" },
    { name: "KJGDFHD", id: 16, x: 700, y: 300, r: 100, color: "#D4DC6C", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "9h 30m" },
    { name: "DHFJGHD", id: 17, x: 800, y: 200, r: 50, color: "#9292C8", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "4h 45m" },
    { name: "JFGHDFG", id: 18, x: 900, y: 100, r: 80, color: "#60DAAC", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "7h 0m" },
    { name: "KJGDFHD", id: 19, x: 100, y: 100, r: 100, color: "#DB5657", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "10h 15m" },
    { name: "DHFJGHD", id: 20, x: 200, y: 200, r: 50, color: "#67BB6D", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "3h 30m" },
    { name: "JFGHDFG", id: 21, x: 300, y: 300, r: 50, color: "#3DC7C7", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "6h 45m" },
    { name: "KJGDFHD", id: 22, x: 400, y: 400, r: 100, color: "#D4DC6C", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "11h 0m" },
    { name: "DHFJGHD", id: 23, x: 500, y: 500, r: 50, color: "#9292C8", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "5h 30m" },
    { name: "JFGHDFG", id: 24, x: 600, y: 600, r: 80, color: "#60DAAC", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "8h 45m" },
    { name: "KJGDFHD", id: 25, x: 700, y: 700, r: 100, color: "#DB5657", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "4h 0m" },
    { name: "DHFJGHD", id: 26, x: 800, y: 800, r: 50, color: "#67BB6D", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "9h 15m" },
    { name: "JFGHDFG", id: 27, x: 900, y: 900, r: 80, color: "#3DC7C7", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "2h 30m" },
    { name: "KJGDFHD", id: 28, x: 100, y: 900, r: 100, color: "#D4DC6C", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "7h 45m" },
    { name: "DHFJGHD", id: 29, x: 200, y: 800, r: 50, color: "#9292C8", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "11h 0m" },
    { name: "JFGHDFG", id: 30, x: 300, y: 700, r: 80, color: "#60DAAC", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "5h 15m" }
];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get("/data", (req, res) => {
    res.json(nodes);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});