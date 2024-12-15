import sys
import whisper
import warnings

warnings.filterwarnings("ignore")

if(len(sys.argv) < 2):
    print ("Please provide a whisper file")
    sys.exit(1)

audio_path = sys.argv[1]

try:
     model = whisper.load_model("base")

     result = model.transcribe(audio_path)

     print(result["text"])
except Exception as e:
    print(f"Error during transcription: {str(e)}", file=sys.stderr)
    sys.exit(1)