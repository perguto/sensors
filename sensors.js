const acl = new Accelerometer({ frequency: 60 });
const acl_x_display = document.getElementById("acl_x");
const acl_y_display = document.getElementById("acl_y");
const acl_z_display = document.getElementById("acl_z");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.fillStyle = "#f00";

function n2s(n, precision = 4, places_before_period = 2, pad = " ") {
  return n
    .toFixed(precision)
    .padStart(precision + 1 + places_before_period, pad);
}
acl.addEventListener("reading", updateAcl);
function updateAcl() {
  console.log(`Acceleration along the X-axis ${acl.x}`);
  // const precision = 4
  const x = acl.x ?? 10 * Math.cos(Date.now() / 1000);
  const y = acl.y ?? 10 * Math.sin(Date.now() / 1000);
  const z = acl.z ?? 2 ** 0.5 * (x + y);
  acl_x_display.textContent = n2s(x);

  console.log(`Acceleration along the Y-axis ${acl.y}`);
  acl_y_display.textContent = n2s(y);

  console.log(`Acceleration along the Z-axis ${acl.z}`);
  acl_z_display.textContent = n2s(z);

  const fillWidth = 10;
  const fillHeight = 10;
  const offset_x = canvas.width / 2;
  const offset_y = canvas.height / 2;
  const max_g = 12;
  const arrow_length = Math.min(canvas.width, canvas.height) / max_g;
  context.fillRect(
    arrow_length * x + offset_x,
    arrow_length * y + offset_y,
    fillWidth,
    fillHeight
  );
}

acl.start();

updateAcl();
