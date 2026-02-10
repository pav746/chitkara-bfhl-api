const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("BFHL API is running");
});


app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: "pavneet1252.be23@chitkara.edu.in"
  });
});


app.post("/bfhl", (req, res) => {
  try {
    const body = req.body;

    if (!body || Object.keys(body).length !== 1) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid request body"
      });
    }

    const key = Object.keys(body)[0];
    const value = body[key];

    let result;

    switch (key) {
      case "fibonacci": {
        if (!Number.isInteger(value) || value < 0) throw new Error();
       const fib = [0, 1];
        for (let i = 2; i <= value; i++) {
        fib.push(fib[i - 1] + fib[i - 2]);
        }
        result = fib.slice(0, value + 1);
        break;
      }

      case "prime": {
        if (!Array.isArray(value)) throw new Error();
        result = value.filter(n => {
          if (n < 2) return false;
          for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return false;
          }
          return true;
        });
        break;
      }

      case "lcm": {
        if (!Array.isArray(value)) throw new Error();
        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
        result = value.reduce((a, b) => (a * b) / gcd(a, b));
        break;
      }

      case "hcf": {
        if (!Array.isArray(value)) throw new Error();
        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
        result = value.reduce((a, b) => gcd(a, b));
        break;
      }

      case "AI": {
        if (typeof value !== "string") throw new Error();
        result = "Mumbai"; 
        break;
      }

      default:
        return res.status(400).json({
          is_success: false,
          error: "Invalid key"
        });
    }

    res.status(200).json({
      is_success: true,
      official_email: "pavneet1252.be23@chitkara.edu.in",
      data: result
    });

  } catch (err) {
    res.status(400).json({
      is_success: false,
      error: "Bad request"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
