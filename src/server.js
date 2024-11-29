import express from 'express'
import cors from 'cors'
import axios from "axios";
import bodyParser from 'body-parser';
const { urlencoded } = bodyParser;
import crypto from 'crypto';
import config from './config/config.js';

import authRouter from './routes/authRoutes.js';
import courseRouter from './routes/courseRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import nhanXetRouter from './routes/nhanXetRoutes.js';
import regisCoursetRouter from './routes/registerCourseRoutes.js';
import ordertRouter from './routes/orderRoutes.js';
import likeCourseRouter from './routes/likeCourseController.js';
import followAuthorRouter from './routes/followAuthorRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
app.use(urlencoded({ extended: true }));

import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import kiemDuyetRoute from './routes/kiemDuyetRoutes.js';
import blackListRoute from './routes/blackListRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import blockUserRoute from './routes/blockUserRoutes.js';
import promotionRoute from './routes/promotionRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import hashTagRoutes from './routes/hashTagRoutes.js';
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "API Information",
            contact: {
                name: "Developer",
            },
            servers: ["http://localhost:8080"],
        },
        tags: [
            {
                name: 'Auth',
                description: 'Các chức năng liên quan đến xác thực',
            },
            {
                name: 'Evaluate',
                description: 'Các chức năng liên quan đến nhận xét',
            },
            {
                name: 'Comments',
                description: 'Các chức năng liên quan đến bình luận',
            },
            {
                name: 'Courses',
                description: 'Các chức năng liên quan đến khóa học',
            },
            {
                name: 'Follow',
                description: 'Các chức năng liên quan đến theo dõi',
            },
            {
                name: 'Favorite Courses',
                description: 'Các chức năng liên quan đến khóa học ưa thích',
            },
            {
                name: 'Orders',
                description: 'Các chức năng liên quan đến đơn hàng',
            },
            {
                name: 'Regis Courses',
                description: 'Các chức năng liên quan đến khóa học đăng ký',
            },
            {
                name: 'User',
                description: 'Các chức năng liên quan đến người dùng',
            },
        ],
    },
    apis: ["src/swagger/index.js"], 
};
const specs = swaggerJsDoc(options);
// app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/swagger", swaggerUi.serve, (req, res, next) => {
    next();
}, swaggerUi.setup(specs));


app.use(cors())
app.use(express.json());

app.use(authRouter)
app.use(vnpayRoutes)
app.use(courseRouter)
app.use(commentRouter)
app.use(nhanXetRouter)
app.use(regisCoursetRouter)
app.use(ordertRouter)
app.use(likeCourseRouter)
app.use(userRouter)
app.use(followAuthorRouter)
app.use(kiemDuyetRoute)
app.use(blackListRoute)
app.use(categoryRoutes)
app.use(blockUserRoute)
app.use(promotionRoute)
app.use(paymentRoutes)
app.use(videoRoutes)
app.use(hashTagRoutes)

// MOMO
// app.post('/payment', async (req, res) => {
//     let {
//       accessKey,
//       secretKey,
//       orderInfo,
//       partnerCode,
//       redirectUrl,
//       ipnUrl,
//       requestType,
//       extraData,
//       orderGroupId,
//       autoCapture,
//       lang,
//     } = config;
  
//     var amount = '10000';
//     var orderId = partnerCode + new Date().getTime();
//     var requestId = orderId;
  
//     //before sign HMAC SHA256 with format
//     //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
//     var rawSignature =
//       'accessKey=' +
//       accessKey +
//       '&amount=' +
//       amount +
//       '&extraData=' +
//       extraData +
//       '&ipnUrl=' +
//       ipnUrl +
//       '&orderId=' +
//       orderId +
//       '&orderInfo=' +
//       orderInfo +
//       '&partnerCode=' +
//       partnerCode +
//       '&redirectUrl=' +
//       redirectUrl +
//       '&requestId=' +
//       requestId +
//       '&requestType=' +
//       requestType;
  
//     //signature
//     var signature = crypto
//       .createHmac('sha256', secretKey)
//       .update(rawSignature)
//       .digest('hex');
  
//     //json object send to MoMo endpoint
//     const requestBody = JSON.stringify({
//       partnerCode: partnerCode,
//       partnerName: 'Test',
//       storeId: 'MomoTestStore',
//       requestId: requestId,
//       amount: amount,
//       orderId: orderId,
//       orderInfo: orderInfo,
//       redirectUrl: redirectUrl,
//       ipnUrl: ipnUrl,
//       lang: lang,
//       requestType: requestType,
//       autoCapture: autoCapture,
//       extraData: extraData,
//       orderGroupId: orderGroupId,
//       signature: signature,
//     });
  
//     // options for axios
//     const options = {
//       method: 'POST',
//       url: 'https://test-payment.momo.vn/v2/gateway/api/create',
//       headers: {
//         'Content-Type': 'application/json',
//         'Content-Length': Buffer.byteLength(requestBody),
//       },
//       data: requestBody,
//     };
  
//     // Send the request and handle the response
//     let result;
//     try {
//       result = await axios(options);
//       return res.status(200).json(result.data);
//     } catch (error) {
//       return res.status(500).json({ statusCode: 500, message: error.message });
//     }
//   });
  
//   app.post('/callback', async (req, res) => {
//     /**
//       resultCode = 0: giao dịch thành công.
//       resultCode = 9000: giao dịch được cấp quyền (authorization) thành công .
//       resultCode <> 0: giao dịch thất bại.
//      */
//     console.log('callback: ');
//     console.log(req.body);
//     /**
//      * Dựa vào kết quả này để update trạng thái đơn hàng
//      * Kết quả log:
//      * {
//           partnerCode: 'MOMO',
//           orderId: 'MOMO1712108682648',
//           requestId: 'MOMO1712108682648',
//           amount: 10000,
//           orderInfo: 'pay with MoMo',
//           orderType: 'momo_wallet',
//           transId: 4014083433,
//           resultCode: 0,
//           message: 'Thành công.',
//           payType: 'qr',
//           responseTime: 1712108811069,
//           extraData: '',
//           signature: '10398fbe70cd3052f443da99f7c4befbf49ab0d0c6cd7dc14efffd6e09a526c0'
//         }
//      */
  
//     return res.status(204).json(req.body);
//   });
  
//   app.post('/check-status-transaction', async (req, res) => {
//     const { orderId } = req.body;
  
//     // const signature = accessKey=$accessKey&orderId=$orderId&partnerCode=$partnerCode
//     // &requestId=$requestId
//     var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
//     var accessKey = 'F8BBA842ECF85';
//     const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;
  
//     const signature = crypto
//       .createHmac('sha256', secretKey)
//       .update(rawSignature)
//       .digest('hex');
  
//     const requestBody = JSON.stringify({
//       partnerCode: 'MOMO',
//       requestId: orderId,
//       orderId: orderId,
//       signature: signature,
//       lang: 'vi',
//     });
  
//     // options for axios
//     const options = {
//       method: 'POST',
//       url: 'https://test-payment.momo.vn/v2/gateway/api/query',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       data: requestBody,
//     };
  
//     const result = await axios(options);
  
//     return res.status(200).json(result.data);
//   });

// END MOMO

app.listen(8080)


//chat 
import { createServer } from "http";
import { Server } from "socket.io";
import initModels from "./models/init-models.js";
import sequelize from './models/connect.js';
import vnpayRouter from './routes/vnpayRoutes.js';
import vnpayRoutes from './routes/vnpayRoutes.js';

// Khởi tạo models
const model = initModels(sequelize);

const httpServer = createServer(app);

// đối tượng socket server
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  // Xử lý join-room
socket.on("join-room", async (roomId) => {
  // Tách RoomId thành 2 ID
  const [userId1, userId2] = roomId.split("-").map(Number);

  // Đảm bảo ID nhỏ hơn trước
  const normalizedRoomId = userId1 < userId2 ? `${userId1}-${userId2}` : `${userId2}-${userId1}`;

  socket.join(normalizedRoomId);

  // Lấy dữ liệu chat từ cơ sở dữ liệu
  let data = await model.Chat.findAll({
    where: {
      RoomId: normalizedRoomId
    }
  });

  // Gửi dữ liệu chat đến tất cả người dùng trong phòng
  io.to(normalizedRoomId).emit("data-chat", data);
});

// Xử lý send-message
socket.on("send-message", async (data) => {
  const { IDNguoiDung, Content, RoomId, NgayGui } = data;

  // Kiểm tra dữ liệu trước khi gửi lại cho các client khác
  if (!IDNguoiDung || !Content || !RoomId || !NgayGui) {
    return; 
  }

  try {
    // Đảm bảo RoomId có thứ tự cố định
    const [userId1, userId2] = RoomId.split("-").map(Number);
    const normalizedRoomId = userId1 < userId2 ? `${userId1}-${userId2}` : `${userId2}-${userId1}`;

    // Lưu tin nhắn vào cơ sở dữ liệu
    await model.Chat.create({
      IDNguoiDung,    
      Content,        
      RoomId: normalizedRoomId,         
      NgayGui,        
    });

    // Gửi tin nhắn đến các client khác trong room
    io.to(normalizedRoomId).emit("send-message", {
      message: Content,
      userId: IDNguoiDung,
      roomId: normalizedRoomId,
      NgayGui: new Date().toISOString()
    });
  } catch (error) {
  }
});
});

httpServer.listen(8081);
