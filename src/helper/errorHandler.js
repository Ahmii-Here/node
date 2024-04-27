module.exports = function errorHandler(func) {
	return async (req, res) => {
        try {
            await func(req, res);
        } catch (err) {
            res.status(500).send({ status: "Error",success: false, message: err.message });
        }
	};
};