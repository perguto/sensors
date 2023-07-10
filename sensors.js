const acl = new Accelerometer({ frequency: 60 });
const history_length = 10 ** 6;
// const history_stride = 4
// const history_buffer_size = history_length * history_stride
const acl_history = new Array(4)
  .fill("")
  .map(() => new Float64Array(history_length)); // [t,x,y,z]
const acl_x_display = document.getElementById("acl_x");
const acl_y_display = document.getElementById("acl_y");
const acl_z_display = document.getElementById("acl_z");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.fillStyle = "#f00";
const illuminance_display = document.getElementById('illuminance')
const orientation_display = document.getElementById('orientation')

function setColumn(M, v, j) {
  // adds row vector v to Matrix M (changes M)
  for (let i = 0; i < M.length; i++) {
    M[i]
	  acl_history[i][j]=v[i]
  }
}
let history_last = 0

function n2s(n, precision = 4, places_before_period = 2, pad = " ") {
  return n
    .toFixed(precision)
    .padStart(precision + 1 + places_before_period, pad);
}

function updateAcl() {
  console.log(`Acceleration along the X-axis ${acl.x}`);
  // const precision = 4
  const x = acl.x ?? 10 * Math.cos(Date.now() / 1000);
  const y = acl.y ?? 10 * Math.sin(Date.now() / 1000);
  const z = acl.z ?? 2 ** 0.5 * (x + y);
  const t = acl.timestamp ?? Date.now();

  const v = [t, x, y, z];
  setColumn(acl_history, v, history_last);
	history_last++

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
  const arrow_length = (0.5 * Math.min(canvas.width, canvas.height)) / max_g;
  context.fillRect(
    arrow_length * x + offset_x,
    arrow_length * y + offset_y,
    fillWidth,
    fillHeight
  );
}

acl.addEventListener("reading", updateAcl);
acl.start();
updateAcl();



if ("AmbientLightSensor" in window) {
  const light_sensor = new AmbientLightSensor();
  light_sensor.addEventListener("reading", (event) => {
    console.log("Current light level:", light_sensor.illuminance);
	  illuminance_display.textContent = light_sensor.illuminance
  });
  light_sensor.addEventListener("error", (event) => {
    console.log(event.error.name, event.error.message);
  });
  light_sensor.start();
}


const options = { frequency: 60, referenceFrame: "device" };
const orientation_sensor = new AbsoluteOrientationSensor(options);

orientation_sensor.addEventListener("reading", () => {
  const q = orientation_sensor.quaternion
	console.log(q)
	orientation_display.textContent = q
});
orientation_sensor.addEventListener("error", (event) => {
  if (event.error.name === "NotReadableError") {
    console.log("Sensor is not available.");
  }
});
orientation_sensor.start();
