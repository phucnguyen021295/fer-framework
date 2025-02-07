import {baseApi} from '@/fe-base/apis';

export const uploadApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    uploadFile: builder.mutation({
      query: (file: any, params: any) => {
        // Tạo FormData để gửi file
        const _file = {
          uri: file.path,
          type: file.mime || 'image/jpg',
          name: file.filename,
        };
        const formData = new FormData();
        formData.append('file', _file);

        return {
          url: '/api/v1/upload',
          method: 'POST',
          body: formData,
          ...(params ? {params} : {}),
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      },
      transformResponse: response => response.data,
    }),

    getImage: builder.query({
      query: (params: {filePath: string}) => ({
        url: `/api/v1/download`,
        method: 'GET',
        params: params,
        responseHandler: async response => {
          const blob = await response.blob();
          const base64 = await blobToBase64(blob);
          return base64; // Trả về chuỗi Base64
        },
      }),
    }),
  }),
});

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string); // Base64 string
    };
    reader.onerror = () => {
      reject(new Error('Failed to convert blob to Base64'));
    };
    reader.readAsDataURL(blob); // Đọc blob dưới dạng Base64
  });
};

export const {useUploadFileMutation, useGetImageQuery} = uploadApi;
