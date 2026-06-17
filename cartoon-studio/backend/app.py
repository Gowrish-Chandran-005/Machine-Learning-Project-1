import cv2
import numpy as np
import base64
import time
import io
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image

app = Flask(__name__)
CORS(app)

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def edge_mask(img, line_size, blur_value):
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    gray_blur = cv2.medianBlur(gray, blur_value)
    edges = cv2.adaptiveThreshold(
        gray_blur, 255,
        cv2.ADAPTIVE_THRESH_MEAN_C,
        cv2.THRESH_BINARY,
        line_size, 3
    )
    return edges

def color_quantization(img, k):
    data = np.float32(img).reshape((-1, 3))
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20, 0.001)
    ret, label, centre = cv2.kmeans(
        data, k, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS
    )
    centre = np.uint8(centre)
    result = centre[label.flatten()]
    result = result.reshape(img.shape)
    return result

def cartoonize(img):
    edges = edge_mask(img, 7, 7)
    img_q = color_quantization(img, 9)
    blurred = cv2.bilateralFilter(img_q, d=7, sigmaColor=200, sigmaSpace=200)
    cartoon = cv2.bitwise_and(blurred, blurred, mask=edges)
    return cartoon

def img_to_base64(img_array):
    img_bgr = cv2.cvtColor(img_array, cv2.COLOR_RGB2BGR)
    _, buffer = cv2.imencode('.png', img_bgr)
    return base64.b64encode(buffer).decode('utf-8')

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

@app.route('/cartoonize', methods=['POST'])
def cartoonize_endpoint():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type. Use JPG, JPEG, or PNG'}), 400

    file_bytes = file.read()
    if len(file_bytes) > MAX_FILE_SIZE:
        return jsonify({'error': 'File too large. Maximum size is 10MB'}), 400

    try:
        start_time = time.time()

        np_arr = np.frombuffer(file_bytes, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if img is None:
            return jsonify({'error': 'Could not decode image'}), 400

        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        h, w = img_rgb.shape[:2]

        # Resize if too large for performance
        max_dim = 1200
        if max(h, w) > max_dim:
            scale = max_dim / max(h, w)
            img_rgb = cv2.resize(img_rgb, (int(w * scale), int(h * scale)))
            h, w = img_rgb.shape[:2]

        cartoon_img = cartoonize(img_rgb)
        processing_time = round((time.time() - start_time) * 1000)

        original_b64 = img_to_base64(img_rgb)
        cartoon_b64 = img_to_base64(cartoon_img)

        return jsonify({
            'success': True,
            'original': f'data:image/png;base64,{original_b64}',
            'cartoon': f'data:image/png;base64,{cartoon_b64}',
            'processing_time_ms': processing_time,
            'dimensions': {'width': w, 'height': h}
        })

    except Exception as e:
        return jsonify({'error': f'Processing failed: {str(e)}'}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
