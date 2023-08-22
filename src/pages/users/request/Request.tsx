import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/hook/useTypedSeletor";
import {
  createInvoice,
  editInvoice,
  getAllInvoice,
} from "../../../redux/invoice/invoiceAction";
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
import { toast } from "react-toastify";
import { getUser } from "../../../redux/user/userAction";
import { storage } from "../../../components/imageFirebase/firebase";
import { FirebaseStorage, getDownloadURL, ref } from "firebase/storage";

interface RequestProps {
  modal?: boolean;
  invoice?: any;
  isEdit?: boolean;
  idEdit?: any;
  handleClose?: () => void;
}

export interface MuiProps {
  defaultValue?: any;
  value?: any;
}

const MyRequest: React.FC<RequestProps> = ({
  modal,
  invoice,
  isEdit,
  handleClose,
}) => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state: any) => state.user);
  const currentInvoice = useAppSelector(
    (state) => state.invoice.currentInvouce
  );
  const [currentInvoiceData, setCurrentInvoiceData] = useState<any>();
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<any>();
  const { currentUser } = value;
  const [file, setFile] = useState<any>(null);
  useEffect(() => {
    const userId = window.localStorage.getItem("idUser");
    const fetchData = async () => {
      if (userId) await dispatch(getUser(parseInt(userId)));
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (currentInvoice) {
      const getImage: any = async () => {
        try {
          const storageRef = ref(storage, currentInvoice.image);
          const url = await getDownloadURL(storageRef);
          setImageUrl(url);
        } catch (error) {
          console.error("Error getting image from Firebase:", error);
        }
      };
      getImage();
    }
  }, [currentInvoice]);
  const defaultValues: {
    file: string | null;
    code: string;
    moneyReduce: string;
  } = {
    file: isEdit ? imageFile : null,
    code: isEdit ? currentInvoice.code : "",
    moneyReduce: isEdit ? currentInvoice.reducedType : "",
  };
  console.log("defaultInvoice", defaultValues);
  const schema = yup.object({
    file: yup.mixed(),
    code: yup.string(),
    moneyReduce: yup.string().required("Vui lòng chọn loại voucher!"),
  });
  const {
    handleSubmit,
    register,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<any>({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });
  useEffect(() => {
    setValue("file", imageFile);
    if (currentInvoice.code) {
      setValue("code", currentInvoice.code);
    }
    setValue("moneyReduce", currentInvoice.reducedType);
  }, [imageFile]);

  const onSubmit = handleSubmit(async (data: any) => {
    const formData = new FormData();
    if (isEdit && file !== null) {
      formData.append("image", file);
      formData.append("code", data.code);
      formData.append("reducedType", data.moneyReduce);
      formData.append("gmail", currentUser.gmail);
      await dispatch(editInvoice({ data: formData, id: currentInvoice.id }));
      const userId = window.localStorage.getItem("idUser");
      const fetchData = async () => {
        if (userId) await dispatch(getUser(userId));
      };
      await fetchData();
    } else if (isEdit && file === null) {
      formData.append("code", data.code);
      formData.append("reducedType", data.moneyReduce);
      formData.append("gmail", currentUser.gmail);
      await dispatch(editInvoice({ data: formData, id: currentInvoice.id }));
      const userId = window.localStorage.getItem("idUser");
      const fetchData = async () => {
        if (userId) await dispatch(getUser(userId));
      };
      await fetchData();
    } else if (!isEdit && file !== null && !file.type?.startsWith("image/")) {
      toast.error("Hóa đơn phải là một hình ảnh!");
    } else if (!isEdit && file === null) {
      toast.error("Vui lòng thêm hình ảnh hóa đơn vào!");
    } else {
      formData.append("image", file);
      formData.append("code", data.code);
      formData.append("reducedType", data.moneyReduce);
      formData.append("gmail", currentUser.gmail);
      formData.append("createBy", currentUser.id);
      await dispatch(createInvoice(formData));
    }
    if (!isEdit) {
      setFile(null);
      reset({
        code: "",
        moneyReduce: undefined,
      });
    }
    await setTimeout(() => {
      if (isEdit && handleClose) {
        handleClose();
      }
    }, 1500);
  });
  const onDrop = (acceptedFiles: any): any => {
    const file = acceptedFiles[0];
    if (file === undefined) {
      return;
    }
    if (file !== null) {
      if (file.type.startsWith("image/")) {
        setFile(file);
        setValue("file", file);
      } else {
        toast.error("Hóa đơn phải là một hình ảnh!");
      }
    }
  };
  const { getRootProps, isDragActive } = useDropzone({ onDrop });
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
        SEND REQUEST
      </Typography>
      <Box
        sx={{
          width: modal ? "100%" : "80%",
          margin: modal ? "15px auto" : "20px auto",
          display: "flex",
          flexDirection: "column",
          gap: modal ? "15px" : "20px",
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
            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Uploaded"
                width="100%"
                style={{ margin: "auto" }}
              />
            )}
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
                height: "250px",
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
              {isEdit && file === null && imageUrl !== "" && (
                <Box
                  sx={{
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
                      src={imageUrl}
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
              {file === null && !isEdit && (
                <>
                  <CloudUploadIcon
                    sx={{
                      fontSize: "180px",
                      color: "var(--secondary-color)",
                      "@media (max-width: 1025px)": {
                        fontSize: "150px",
                      },
                      "@media (max-width: 769px)": {
                        fontSize: "150px",
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
                        mt: "-20px",
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
              {file && !file.type?.startsWith("image/") && (
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
              {file && file.type?.startsWith("image/") && (
                <Box
                  sx={{
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
                Loại hóa đơn <span style={{ color: "red" }}>*</span>
              </Typography>
              <Controller
                {...register("moneyReduce")}
                control={control}
                name="moneyReduce"
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <FormControlLabel
                      value="30k"
                      control={<Radio />}
                      label="< 3.000.000đ"
                    />
                    <FormControlLabel
                      value="50k"
                      control={<Radio />}
                      label="3.000.000đ - 10.000.000đ"
                    />
                    <FormControlLabel
                      value="100k"
                      control={<Radio />}
                      label=">= 10.000.000đ"
                    />
                  </RadioGroup>
                )}
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
                Code
              </Typography>
              <TextField
                {...register("code")}
                defaultValue={""}
                name="code"
                id="code"
                variant="outlined"
                sx={{ width: "100%" }}
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
    </Box>
  );
};
export default MyRequest;
