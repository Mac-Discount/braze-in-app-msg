require('dotenv').config();
const path = require("path");
const express = require("express");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public/imgs/")));


// routes
app.get("/:page", (req, res, next) => {
	try {
		const pageName = req.params.page;
		res.set({
			"Cache-Control": "no-store", // No caching
			"Pragma": "no-cache",        // HTTP/1.0 backward compatibility
			"Expires": "0",              // Expired immediately
		});
		res.sendFile(path.join(__dirname, "views", `${pageName}.html`));
	} catch (err) {
		next(err);
	}
});

// middleware error handler
app.use((err, req, res, next) => {
	console.error("Error handler caught:", err.message, err.stack);
	res.status(500).send("Something broke!");
});

// 404 error
app.use((req, res, next) => {
	res.status(404).send("404: Check the url pathname!");
});

const PORT = process.env.PORT || 2999;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
