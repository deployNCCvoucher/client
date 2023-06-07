import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useAppDispatch, useAppSelector } from "../../../redux/hook/useTypedSeletor";
import { createInvoice } from "../../../redux/invoice/invoiceAction"
import {
  Box,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ToastContainer, toast } from "react-toastify";


const MyRequest = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state: any) => state.user)
  const { currentUser } = value
  console.log(currentUser)
  const [imageData, setImageData] = useState('');
  const [file, setFile] = useState<any>(null);
  const schema = yup.object({
    file: yup
      .mixed()
      .required("Vui lòng thêm hình ảnh hóa đơn vào!"),
    code: yup.string(),
    moneyReduce: yup.number().required("Vui lòng chọn loại voucher!"),
  });
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<any>({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const img = window.localStorage.getItem('img');
  const onSubmit = handleSubmit((data: any) => {  
    console.log("data", data);
    dispatch(createInvoice({
      image: imageData,
      code: "string",
      reducedType: '30k',
      gmail: "nga.nguyenthithanh@ncc.asia",
      createBy: 1
    }))
    reset({
      code: "",
      moneyReduce: undefined,
    });
    setFile(null);
  });
  const onDrop = (acceptedFiles: any): any => {
    const file = acceptedFiles[0];
    if (file === undefined) {
      return;
    }
    if (file !== null) {
      if (file.type.startsWith("image/")) {
        setFile(file);
      } else {
        toast.error("Hóa đơn phải là một hình ảnh!");
      }
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data: any = reader.result;
      setImageData(base64Data);
    };
    reader.readAsDataURL(file);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  useEffect(() => {
    if (errors.file?.message) {
      toast.error(errors.file.message as any);
    }
    if (errors.code?.message) {
      toast.error(errors.code.message as any);
    }
    if (errors.moneyReduce?.message) {
      toast.error(errors.moneyReduce.message as any);
    }
  }, [errors]);
  useEffect(() => {
    if (file !== null && file.type.startsWith("image/")) {
      setValue("file", imageData);
    } else if (file !== null) {
      toast.error("Hóa đơn phải là một hình ảnh!");
    }
  }, [imageData]);
  console.log('newimg', img)
  console.log('imgdataa', imageData);
  return (
    <Box>
      <Typography
        variant="h5"
        style={{
          fontWeight: "700",
          color: "var(--secondary-color)",
          fontSize: "30px",
        }}
      >
        SENT REQUEST
      </Typography>
      <Box
        sx={{
          width: "80%",
          margin: "20px auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          "@media (max-width: 1025px)": {
            width: "100%",
          },
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                "@media (max-width: 1025px)": {
                  fontSize: "12px",
                },
              }}
            >
              Hình ảnh <span style={{ color: "red" }}>*</span>
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "600px",
                borderRadius: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "20px",
                cursor: "pointer",
                margin: "auto",
                position: "relative",
                overFlow: "hidden",
                backgroundColor: "#ffffff",
                border: "3px solid var(--secondary-color)",
                "@media (max-width: 1025px)": {
                  height: "400px",
                  borderRadius: "10px",
                },
                "@media (max-width: 769px)": {
                  height: "300px",
                  gap: "10px",
                },
              }}
              {...getRootProps()}
            >
              {file === null && (
                <>
                  <CloudUploadIcon
                    sx={{
                      fontSize: "400px",
                      color: "var(--secondary-color)",
                      "@media (max-width: 1025px)": {
                        fontSize: "200px",
                      },
                      "@media (max-width: 769px)": {
                        fontSize: "100px",
                      },
                    }}
                  />
                  {isDragActive ? (
                    <Typography
                      sx={{
                        fontSize: "20px",
                        color: "var(--secondary-color)",
                        "@media (max-width: 1025px)": {
                          fontSize: "12px",
                        },
                      }}
                    >
                      Thả file vào đây
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "20px",
                        color: "var(--secondary-color)",
                        "@media (max-width: 1025px)": {
                          fontSize: "12px",
                        },
                      }}
                    >
                      Kéo và thả hoặc click để chọn file
                    </Typography>
                  )}
                </>
              )}
              {file && !file.type.startsWith("image/") && (
                <>
                  <CloudUploadIcon
                    sx={{
                      fontSize: "400px",
                      color: "var(--secondary-color)",
                      "@media (max-width: 1025px)": {
                        fontSize: "200px",
                      },
                      "@media (max-width: 769px)": {
                        fontSize: "100px",
                      },
                    }}
                  />
                  {isDragActive ? (
                    <Typography
                      sx={{
                        fontSize: "20px",
                        color: "var(--secondary-color)",
                        "@media (max-width: 1025px)": {
                          fontSize: "12px",
                        },
                      }}
                    >
                      Thả file vào đây
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "20px",
                        color: "var(--secondary-color)",
                        "@media (max-width: 1025px)": {
                          fontSize: "12px",
                        },
                      }}
                    >
                      Kéo và thả hoặc click để chọn file
                    </Typography>
                  )}
                </>
              )}
              {file && file.type.startsWith("image/") && (
                <Box
                  sx={{
                    // position: "absolute",
                    top: "0",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: "12px",
                    "@media (max-width: 1025px)": {
                      borderRadius: "7px",
                    },
                  }}
                >
                  <Box
                    className="scrollbar"
                    sx={{
                      height: "85%",
                      overflowY: "scroll",
                    }}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Uploaded file"
                      width="100%"
                      style={{ margin: "auto" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: "15%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      backgroundColor: "var(--secondary-color)",
                    }}
                  >
                    <CloudUploadIcon
                      sx={{
                        fontSize: "40px",
                        color: "var(--secondary-color01)",
                        "@media (max-width: 1025px)": {
                          fontSize: "22px",
                        },
                      }}
                    />
                    {isDragActive ? (
                      <Typography
                        sx={{
                          fontSize: "20px",
                          color: "var(--secondary-color01)",
                          "@media (max-width: 1025px)": {
                            fontSize: "12px",
                          },
                        }}
                      >
                        Thả file vào đây
                      </Typography>
                    ) : (
                      <Typography
                        sx={{
                          fontSize: "20px",
                          color: "var(--secondary-color01)",
                          "@media (max-width: 1025px)": {
                            fontSize: "12px",
                          },
                        }}
                      >
                        Kéo và thả hoặc click để chọn file khác
                      </Typography>
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "40px",
              "@media (max-width: 1025px)": {
                flexDirection: "column",
              },
            }}
          >
            <Box
              sx={{
                width: "50%",
                "@media (max-width: 1025px)": {
                  width: "100%",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  "@media (max-width: 1025px)": {
                    fontSize: "12px",
                  },
                }}
              >
                Code
              </Typography>
              <TextField
                {...register("code")}
                name="code"
                id="code"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Box>
            <Box
              sx={{
                width: "50%",
                "@media (max-width: 1025px)": {
                  width: "100%",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  "@media (max-width: 1025px)": {
                    fontSize: "12px",
                  },
                }}
              >
                Loại voucher <span style={{ color: "red" }}>*</span>
              </Typography>
              <Controller
                {...register("moneyReduce")}
                control={control}
                name="moneyReduce"
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <FormControlLabel
                      value={0}
                      control={<Radio />}
                      label="< 3.000.000đ"
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="3.000.000đ - 10.000.000đ"
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label=">= 10.000.000đ"
                    />
                  </RadioGroup>
                )}
              />
            </Box>
          </Box>
          <Box sx={{ width: "100%", margin: "auto" }}>
            <Button
              sx={{
                width: "100%",
                backgroundColor: "var(--secondary-color)",
                color: "#fff",
                fontSize: "20px",
                margin: "auto",
              }}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
    </Box>
  );
};
export default MyRequest;
