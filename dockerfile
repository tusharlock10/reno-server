FROM node:14-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

ENV jwtSecret="dfjiksofgjnfgkmitmhibytjhijjjihiytjhybinyithjiyjhihtihjiiohtjyyyyhjtoyhjytohjoyj@21343//"
ENV email="tushar@goreno.in"
ENV pass="Tushar@12321"
ENV msg91Key='201630AQrb9UXon8b5aa10b5c'
ENV razorpayKeyId = 'rzp_test_oCjDks1GbKEPfO'
ENV razorpayKeySecret = "ELBZtrR7vZ9N7TLKQnKtesCB"
ENV googleMatrixApi="AIzaSyDnobPUMbgP7-jMK3OV0UehklnKkjdIblk"
ENV msg91OTPTemplate="60520bdc674a84416d68aa41"

EXPOSE 5000

CMD ["npm", "start"]