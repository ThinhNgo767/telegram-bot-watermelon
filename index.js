// import TelegramBot from "node-telegram-bot-api";
// import "dotenv/config";

// const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// const vegetables = {
//   dc: "Dưa Chưng",
//   dv: "Dưa Vàng",
//   dd: "Dưa Đen",
//   ds: "Dưa Sọc",
//   // Thêm các loại rau củ khác nếu cần
// };

// const totals = [];

// const commands = [
//   { command: "start", description: "Bắt đầu sử dụng bot" },
//   { command: "help", description: "Xem hướng dẫn sử dụng" },
//   { command: "list", description: "Xem danh sách các loại dưa" },
//   { command: "commands", description: "Xem danh sách các lệnh" },
// ];

// async function setCommands() {
//   try {
//     await bot.setMyCommands(commands);
//     console.log("Bot commands đã được cài đặt thành công.");
//   } catch (error) {
//     console.error("Lỗi khi cài đặt bot commands:", error);
//   }
// }

// setCommands();

// bot.on("polling_error", (error) => {
//   console.log("Lỗi polling:", error);
// });

// bot.onText(/\/start/, (msg) => {
//   const chatId = msg.chat.id;
//   const userName = msg.from.first_name || "Người dùng";
//   const welcomeMessage = `Chào mừng *${userName}*\\!\n\nTôi là bot tính giá dưa\\. Vui lòng sử dụng định dạng:\n\`[mã dưa] g [giá] k [các khối lượng]\`\n\nVí dụ: \`dc g 20 k 5 3 2\`\n\nGõ /commands để xem danh sách các lệnh\\.`;
//   bot.sendMessage(chatId, welcomeMessage, { parse_mode: "MarkdownV2" });
// });

// bot.onText(/\/help/, (msg) => {
//   const chatId = msg.chat.id;
//   const helpMessage = `*Hướng dẫn sử dụng:*\n\nSử dụng định dạng: \`[mã dưa] g [giá] k [các khối lượng]\`\n\nTrong đó:\n• Mã dưa: dc \\(Dưa Chưng\\), dv \\(Dưa Vàng\\), dd \\(Dưa Đen\\), ds \\(Dưa Sọc\\)\n• Giá: giá 1kg \\(đơn vị: ngàn đồng\\)\n• Các khối lượng: các số kg cách nhau bởi dấu cách\n\nVí dụ: \`dc g 20 k 5 3 2\``;
//   bot.sendMessage(chatId, helpMessage, { parse_mode: "MarkdownV2" });
// });

// bot.onText(/\/list/, (msg) => {
//   const chatId = msg.chat.id;
//   let listMessage = "*Danh sách các loại dưa:*\n\n";
//   for (const [code, name] of Object.entries(vegetables)) {
//     listMessage += `• ${code}: ${name}\n`;
//   }
//   bot.sendMessage(chatId, listMessage, { parse_mode: "Markdown" });
// });

// bot.onText(/\/commands/, (msg) => {
//   const chatId = msg.chat.id;
//   let commandList = "*Danh sách các lệnh:*\n\n";
//   commands.forEach((cmd) => {
//     commandList += `/${cmd.command} - ${cmd.description}\n`;
//   });
//   bot.sendMessage(chatId, commandList, { parse_mode: "Markdown" });
// });

// function handleCalculation(msg) {
//   const chatId = msg.chat.id;
//   const messageText = msg.text;
//   const userName = msg.from.first_name || "Người dùng";

//   const regex = /^(\w+)\s+g\s+(\d+)\s+k\s+(.+)$/i;
//   const match = messageText.match(regex);

//   if (match) {
//     const [, vegCode, price, weightsStr] = match;
//     const vegetable = vegetables[vegCode.toLowerCase()] || vegCode;
//     const weights = weightsStr.split(" ").map(Number);

//     if (isNaN(price) || weights.some(isNaN) || weights.length === 0) {
//       const invalidInputResponse = `_Xin lỗi, giá hoặc khối lượng không hợp lệ\\. Vui lòng kiểm tra lại\\._`;
//       bot.sendMessage(chatId, invalidInputResponse, {
//         parse_mode: "MarkdownV2",
//       });
//       return;
//     }

//     const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
//     const totalPrice = totalWeight * price * 1000;

//     const total = {
//       waterMelon: vegetable,
//       price: price,
//       totalWeight: totalWeight,
//       totalPrice: totalPrice,
//     };
//     totals.push(total);

//     const response = `Xin chào *${userName}*\n\n_Đơn hàng của bạn là :_\n\nLOẠI DƯA : *${vegetable}*\nGIÁ 1KG : *${price}ngàn*\nTỔNG SỐ KG : *${totalWeight}kg*\nTHÀNH TIỀN: *${totalPrice.toLocaleString(
//       "vi-VN"
//     )}  *`;

//     bot.sendMessage(chatId, response, { parse_mode: "Markdown" });
//   } else {
//     const errorResponse =
//       `_Xin lỗi, tôi không hiểu\\. Vui lòng sử dụng định dạng:_\n` +
//       `\`[mã dưa] g [giá] k [các khối lượng]\`\n\n` +
//       `Ví dụ: \`dc g 20 k 5 3 2\`\n\n` +
//       `Gõ /help để xem hướng dẫn chi tiết hoặc /commands để xem danh sách các lệnh\\.`;
//     bot.sendMessage(chatId, errorResponse, { parse_mode: "MarkdownV2" });
//   }
// }

// bot.on("message", (msg) => {
//   if (!msg.text.startsWith("/")) {
//     handleCalculation(msg);
//   }
// });

// bot.onText(/\/total/, (msg) => {
//   const chatId = msg.chat.id;
//   let listMessage = "*Danh sách các loại dưa:*\n\n";
//   for (const [code, name] of Object.entries(vegetables)) {
//     listMessage += `• ${code}: ${name}\n`;
//   }
//   bot.sendMessage(chatId, listMessage, { parse_mode: "Markdown" });
// });

// console.log("Bot cal is running...");

import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const vegetables = {
  dc: "Dưa Chưng",
  dv: "Dưa Vàng",
  dd: "Dưa Đen",
  ds: "Dưa Sọc",
};

const commands = [
  { command: "start", description: "Bắt đầu sử dụng bot" },
  { command: "help", description: "Xem hướng dẫn sử dụng" },
  { command: "list", description: "Xem danh sách các loại dưa" },
  { command: "commands", description: "Xem danh sách các lệnh" },
  { command: "total", description: "Xem tổng các đơn hàng" },
];

// Đối tượng lưu trữ đơn hàng của người dùng
let userOrders = {};

async function setCommands() {
  try {
    await bot.setMyCommands(commands);
    console.log("Bot commands đã được cài đặt thành công.");
  } catch (error) {
    console.error("Lỗi khi cài đặt bot commands:", error);
  }
}

setCommands();

bot.on("polling_error", (error) => {
  console.log("Lỗi polling:", error);
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name || "Người dùng";
  const welcomeMessage = `Chào mừng *${userName}*\\!\n\nTôi là bot tính giá dưa\\. Vui lòng sử dụng định dạng:\n\`[mã dưa] g [giá] k [các khối lượng]\`\n\nVí dụ: \`dc g 20 k 5 3 2\`\n\nGõ /commands để xem danh sách các lệnh\\.`;
  bot.sendMessage(chatId, welcomeMessage, { parse_mode: "MarkdownV2" });
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const helpMessage = `*Hướng dẫn sử dụng:*\n\nSử dụng định dạng: \`[mã dưa] g [giá] k [các khối lượng]\`\n\nTrong đó:\n• Mã dưa: dc \\(Dưa Chưng\\), dv \\(Dưa Vàng\\), dd \\(Dưa Đen\\), ds \\(Dưa Sọc\\)\n• Giá: giá 1kg \\(đơn vị: ngàn đồng\\)\n• Các khối lượng: các số kg cách nhau bởi dấu cách\n\nVí dụ: \`dc g 20 k 5 3 2\``;
  bot.sendMessage(chatId, helpMessage, { parse_mode: "MarkdownV2" });
});

bot.onText(/\/list/, (msg) => {
  const chatId = msg.chat.id;
  let listMessage = "*Danh sách các loại dưa:*\n\n";
  for (const [code, name] of Object.entries(vegetables)) {
    listMessage += `• ${code}: ${name}\n`;
  }
  bot.sendMessage(chatId, listMessage, { parse_mode: "Markdown" });
});

bot.onText(/\/commands/, (msg) => {
  const chatId = msg.chat.id;
  let commandList = "*Danh sách các lệnh:*\n\n";
  commands.forEach((cmd) => {
    commandList += `/${cmd.command} - ${cmd.description}\n`;
  });
  bot.sendMessage(chatId, commandList, { parse_mode: "Markdown" });
});

bot.onText(/\/total/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (!userOrders[userId] || userOrders[userId].length === 0) {
    bot.sendMessage(chatId, "Bạn chưa có đơn hàng nào.");
    return;
  }

  let totalMessage = "*Danh sách đơn hàng của bạn:*\n\n";
  let totalAmount = 0;

  userOrders[userId].forEach((order, index) => {
    totalMessage += `${index + 1}. ${order.vegetable}: ${
      order.totalWeight
    }kg, ${order.totalPrice.toLocaleString("vi-VN")}đ\n`;
    totalAmount += order.totalPrice;
  });

  totalMessage += `\n*Tổng cộng: ${totalAmount.toLocaleString("vi-VN")}đ*`;

  bot.sendMessage(chatId, totalMessage, { parse_mode: "Markdown" });
  userOrders[userId] = [];
});

function handleCalculation(msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const messageText = msg.text;
  const userName = msg.from.first_name || "Người dùng";

  const regex = /^(\w+)\s+g\s+(\d+)\s+k\s+(.+)$/i;
  const match = messageText.match(regex);

  if (match) {
    const [, vegCode, price, weightsStr] = match;
    const vegetable = vegetables[vegCode.toLowerCase()] || vegCode;
    const weights = weightsStr.split(" ").map(Number);

    if (isNaN(price) || weights.some(isNaN) || weights.length === 0) {
      const invalidInputResponse = `_Xin lỗi, giá hoặc khối lượng không hợp lệ\\. Vui lòng kiểm tra lại\\._`;
      bot.sendMessage(chatId, invalidInputResponse, {
        parse_mode: "MarkdownV2",
      });
      return;
    }

    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const totalPrice = totalWeight * price * 1000;

    // Lưu đơn hàng vào đối tượng userOrders
    if (!userOrders[userId]) {
      userOrders[userId] = [];
    }

    let existingOrder = userOrders[userId].find(
      (order) => order.vegetable === vegetable
    );
    if (existingOrder) {
      existingOrder.totalWeight += totalWeight;
      existingOrder.totalPrice += totalPrice;
    } else {
      // Nếu chưa có, tạo mới đơn hàng
      userOrders[userId].push({
        vegetable,
        totalWeight,
        totalPrice,
      });
    }

    const response = `Xin chào *${userName}*\n\n*Đơn hàng của bạn là :*\n\n_Loại dưa :_ *${vegetable}*\n_Giá $ 1Kg :_ *${price}ngàn*\n_Tổng số Kg :_ *${totalWeight}kg*\n_Thành Tiền :_ *${totalPrice.toLocaleString(
      "vi-VN"
    )}đ*`;

    bot.sendMessage(chatId, response, { parse_mode: "Markdown" });
  } else {
    const errorResponse =
      `_Xin lỗi, tôi không hiểu\\. Vui lòng sử dụng định dạng:_\n` +
      `\`[mã dưa] g [giá] k [các khối lượng]\`\n\n` +
      `Ví dụ: \`dc g 20 k 5 3 2\`\n\n` +
      `Gõ /help để xem hướng dẫn chi tiết hoặc /commands để xem danh sách các lệnh\\.`;
    bot.sendMessage(chatId, errorResponse, { parse_mode: "MarkdownV2" });
  }
}

bot.on("message", (msg) => {
  if (!msg.text.startsWith("/")) {
    handleCalculation(msg);
  }
});

console.log("Bot cal is running...");
