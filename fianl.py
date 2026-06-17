# %%
!pip install opencv-python

# %%
%pip install matplotlib

# %%
!pip install pandas

# %%
import cv2
import numpy as np
import matplotlib.pyplot as plt
import pandas

# %%
def read_file():
    img = cv2.imread(r"D:\ML PROJECTS\1\assests\dex.jpg")
    img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
    plt.imshow(img)
    plt.show()
    return img

# %%
import os

path = r"D:\ML PROJECTS\1\assests\dex.jpg"

print("Exists:", os.path.exists(path))
img = cv2.imread(path)
print("Image:", img)

# %%
img=read_file()
og_img=img
img

# %% [markdown]
# EDGE MASKS - INCREASE THE EDGES

# %%
def edge_mask(img, line_size, blur_value):
    gray=cv2.cvtColor(img,cv2.COLOR_RGB2GRAY)
    gray_blur=cv2.medianBlur(gray,blur_value)

    edges=cv2.adaptiveThreshold(gray_blur,255,cv2.ADAPTIVE_THRESH_MEAN_C,cv2.THRESH_BINARY,line_size,3)

    return edges

# %%
edges=edge_mask(img, 7, 7)
plt.imshow(edges,cmap="gray")
plt.show()

# %% [markdown]
# REDUCE THE COLOR PALETTE

# %%
def color_quantization(img,k):
    data=np.float32(img).reshape((-1,3))
    criteria =(cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20 ,0.001)
    ret, label, centre=cv2.kmeans(data,k,None,criteria,10,cv2.KMEANS_RANDOM_CENTERS)
    centre = np.uint8(centre)

    result=centre[label.flatten()]
    result=result.reshape(img.shape)

    return result

# %%
img_q=color_quantization(img,k=9)
plt.imshow(img_q)
plt.show()

# %%
blurred =cv2.bilateralFilter(img_q,d=7,sigmaColor=200,sigmaSpace=200)
plt.imshow(blurred)
plt.show()

# %% [markdown]
# cartoon

# %%
def cartoon(blurred):
    c=cv2.bitwise_and(blurred,blurred,mask=edges)
    
    plt.imshow(og_img)
    plt.show()

    plt.imshow(c)
    plt.show()

    return c
cartoon(blurred)


