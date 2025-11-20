from flask import Flask, request, jsonify
import numpy as np
import pandas as pd

app = Flask(__name__)

# =========================
# MÔ PHỎNG TÀI XỈU (NUMPY)
# =========================
def simulate(n):
    dice = np.random.randint(1, 7, size=(n, 3))
    total = dice.sum(axis=1)

    result = np.where(total >= 11, "Tài", "Xỉu")
    mask_triplet = (dice[:,0]==dice[:,1]) & (dice[:,1]==dice[:,2])
    result[mask_triplet] = "Bộ Ba"

    df = pd.DataFrame({
        "D1": dice[:,0],
        "D2": dice[:,1],
        "D3": dice[:,2],
        "Total": total,
        "Result": result
    })
    return df


# =========================
# ROUTE API
# =========================
@app.route("/simulate", methods=["POST"])
def simulate_api():
    data = request.json
    n = int(data.get("n",100000))

    df = simulate(n)

    stats = df["Result"].value_counts().to_dict()
    total = len(df)

    return jsonify({
        "status": "success",
        "total": total,
        "stats": stats,
        "totals": df["Total"].tolist()[:2000],
        "results": df["Result"].tolist()[:2000]
    })


@app.route("/")
def home():
    return "Super Bot Tài Xỉu v3 – Flask API đang hoạt động."


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
