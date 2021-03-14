FROM node:14-slim

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV jwtSecret="dfjiksofgjnfgkmitmhibytjhijjjihiytjhybinyithjiyjhihtihjiiohtjyyyyhjtoyhjytohjoyj@21343//"
ENV email="tushar@goreno.in"
ENV pass="Tushar@12321"
ENV msg91Key='201630AQrb9UXon8b5aa10b5c'
ENV razorpayKeyId = 'rzp_test_35LDl80yPyMiMo'
ENV razorpayKeySecret = "pLDcqBbUdjQUdbCB4C5PJ7vA"
ENV googleMatrixApi="AIzaSyDnobPUMbgP7-jMK3OV0UehklnKkjdIblk"
ENV PORT=5000

EXPOSE 5000

CMD ["npm", "start"]