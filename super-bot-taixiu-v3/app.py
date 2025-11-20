from flask import Flask, request, jsonify, render_template
import numpy as np
import pandas as pd
import json

app = Flask(__name__)

def simulate_taixiu(n=200000):
    dice = np.random.randint(1, 7, size=(n, 3))
    total = dice.sum(axis=1)
    result = np.where(total >= 11, "Tài", "Xỉu")
    mask_trip = (dice[:, 0] == dice[:, 1]) & (dice[:, 1] == dice[:, 2])
    result[mask_trip] = "Bộ Ba"
    df = pd.DataFrame({
        "D1": dice[:, 0],
        "D2": dice[:, 1],
        "D3": dice[:, 2],
        "Total": total,
        "Result": result
    })
    return df

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/simulate", methods=["POST"])
def api_simulate():
    data = request.json
    n = int(data.get("n", 200000))
    df = simulate_taixiu(n)
    stats = df["Result"].value_counts().to_dict()
    totals = df["Total"].tolist()[:2000]
    results = df["Result"].tolist()[:2000]
    return jsonify({
        "status": "success",
        "stats": stats,
        "totals": totals,
        "results": results
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
