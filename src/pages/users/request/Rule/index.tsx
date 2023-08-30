import { Box, Typography } from "@mui/material";

const Rule = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        "@media (max-width: 768px)": {
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          width: "20%",
          "@media (max-width: 768px)": {
            width: "30%",
          },
          "@media (max-width: 376px)": {
            width: "60%",
          },
        }}
      >
        <img
          src="../images/vcoupon.png"
          alt="coupon"
          style={{ width: "100%" }}
        />
      </Box>
      <Box sx={{ color: "#a9a1c4", flex: "1" }}>
        <Typography fontSize="12px">
          Tổng giá trị hóa đơn nhỏ hơn 3 triệu Đổi được 1 voucher phạt 30K
        </Typography>
        <Typography fontSize="12px">
          Tổng giá trị hóa đơn từ 3 triệu đến dưới 10 triệu Đổi được 1 voucher
          phạt 50K
        </Typography>
        <Typography fontSize="12px">
          Tổng giá trị hóa đơn từ 10 triệu trở lên Đổi được 1 voucher phạt 100K
        </Typography>
        <Typography fontSize="12px">
          Lưu ý: Đối với hóa đơn trên 20 triệu vui lòng liên hệ kế toán trước
          khi xuất hóa đơn. Cần gấp liên hệ hotline: 0972.091.388
        </Typography>
        <Typography fontSize="12px">
          Chỉ chấp nhận các hóa đơn với các loại hình sau: ăn uống, xăng dầu,
          mua máy tính và các thiết bị liên quan đến máy tính, vé máy bay và
          phòng khách sạn ở các nơi mà công ty có văn phòng đại diện (các loại
          hình khác cứ lấy hóa đơn về bộ phận kế toán sẽ xem xét tính hợp lệ của
          hóa đơn và phản hồi)
        </Typography>
        <Typography fontSize="12px">
          Các thông tin trên hóa đơn phải chính xác các thông tin như sau:
        </Typography>
        <Typography fontSize="12px">
          Tên công ty: Công ty Cổ Phần NCCPLUS Việt Nam
        </Typography>
        <Typography fontSize="12px">Mã số thuế: 0108215748</Typography>
        <Typography fontSize="12px">
          Địa chỉ: Số 3B ngõ 69, phố Nguyễn Phúc Lai, Phường Ô Chợ Dừa, Quận
          Đống Đa, Thành phố Hà Nội, Việt Nam
        </Typography>
      </Box>
    </Box>
  );
};
export default Rule;
