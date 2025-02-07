const handleUploadMap: Record<string, any[]> = {};

const registerUploadChange = (eventName: string, handleChange: any) => {
  if (!handleUploadMap[eventName]) {
    handleUploadMap[eventName] = [];
  }

  if (!handleUploadMap[eventName].includes(handleChange)) {
    handleUploadMap[eventName].push(handleChange);
  }
};

const unRegisterUploadChange = (eventName: string, handleChange: any) => {
  const handlers = handleUploadMap[eventName];
  if (handlers) {
    const index = handlers.indexOf(handleChange);
    if (index !== -1) {
      handlers.splice(index, 1); // Xóa phần tử tại vị trí tìm được
    }
    // Xóa luôn eventName nếu không còn handler nào
    if (handlers.length === 0) {
      delete handleUploadMap[eventName];
    }
  }
};

const broadcastUpload = (eventName: string, onFinish?: () => void) => {
  const handlers = handleUploadMap[eventName];
  if (handlers) {
    handlers.forEach(handler => handler());
  } else {
    onFinish && onFinish();
  }
};

export {registerUploadChange, unRegisterUploadChange, broadcastUpload};
