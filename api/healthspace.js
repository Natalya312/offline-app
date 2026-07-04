export default function handler(req, res) {
  res.status(200).json({
    status: "ok",
    message: "Offline App API работает!",
    time: new Date().toISOString()
  });
}
