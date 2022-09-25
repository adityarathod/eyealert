"""
Demonstration of the GazeTracking library.
Check the README.md for complete documentation.
"""

import cv2
import time
from gaze_tracking import GazeTracking
import pusher

pusher_client = pusher.Pusher(
  app_id='1481831',
  key='43d4458867c165e92f6b',
  secret='6d8f4a2b6b5f05ade02e',
  cluster='us2',
  ssl=True
)


def resize_with_aspect_ratio(image, width=None, height=None, inter=cv2.INTER_AREA):
    dim = None
    (h, w) = image.shape[:2]

    if width is None and height is None:
        return image
    if width is None:
        r = height / float(h)
        dim = (int(w * r), height)
    else:
        r = width / float(w)
        dim = (width, int(h * r))

    return cv2.resize(image, dim, interpolation=inter)

gaze = GazeTracking()
webcam = cv2.VideoCapture(0)

start_time = 0
prev_t = 0
text = ""

while True:
    # We get a new frame from the webcam
    _, frame = webcam.read()

    # We send this frame to GazeTracking to analyze it
    gaze.refresh(frame)

    frame = gaze.annotated_frame()

    # # If is blinking
    #     start time
    #     blink flag true
    # // If not blinking
    #     edn time
    #     calc time
    #     blink glag False

    if gaze.is_blinking():
        start_time = time.time()
        blink = True
        # pusher_client.trigger('my-channel', 'my-event', {'message': True})
        text = "Blinking"
    else:
        elapsed_time = time.time() - start_time
        if elapsed_time < prev_t and prev_t < 1000:
            # TODO: prev_t will store the time before this blink
            print(prev_t)
            pusher_client.trigger('events', 'event', {'message': prev_t})
        prev_t = elapsed_time
        blink = False
        text = "Eyes open"

    cv2.putText(frame, text, (90, 60), cv2.FONT_HERSHEY_DUPLEX, 1.6, (147, 58, 31), 2)

    left_pupil = gaze.pupil_left_coords()
    right_pupil = gaze.pupil_right_coords()
    cv2.putText(frame, "Left pupil:  " + str(left_pupil), (90, 130), cv2.FONT_HERSHEY_DUPLEX, 0.9, (147, 58, 31), 1)
    cv2.putText(frame, "Right pupil: " + str(right_pupil), (90, 165), cv2.FONT_HERSHEY_DUPLEX, 0.9, (147, 58, 31), 1)

    frame = resize_with_aspect_ratio(frame, width=2560)
    cv2.imshow("Demo", frame)

    if cv2.waitKey(1) == 27:
        break

ws.close()
webcam.release()
cv2.destroyAllWindows()
