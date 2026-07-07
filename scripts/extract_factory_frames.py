from __future__ import annotations

import subprocess
from pathlib import Path

import imageio_ffmpeg


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets" / "factory-process"
FFMPEG = Path(imageio_ffmpeg.get_ffmpeg_exe())

VIDEOS = [
    ("plate-surface-treatment", Path(r"E:\chinafreeweight.com资料\生成过程\铃片表面处理.mp4"), "00:00:04"),
    ("plate-surface-treatment-2", Path(r"E:\chinafreeweight.com资料\生成过程\铃片表面处理2.mp4"), "00:00:05"),
    ("plate-raw-material", Path(r"E:\chinafreeweight.com资料\生成过程\铃片材料.mp4"), "00:00:04"),
    ("detail-polishing", Path(r"E:\chinafreeweight.com资料\生成过程\细节打磨.mp4"), "00:00:04"),
    ("detail-polishing-2", Path(r"E:\chinafreeweight.com资料\生成过程\细节打磨2.mp4"), "00:00:04"),
    ("detail-polishing-video", Path(r"E:\chinafreeweight.com资料\生成过程\细节打磨视频.mp4"), "00:00:05"),
    ("dumbbell-material", Path(r"E:\chinafreeweight.com资料\生成过程\哑铃材料.mp4"), "00:00:04"),
    ("dumbbell-cutting", Path(r"E:\chinafreeweight.com资料\生成过程\哑铃下料.mp4"), "00:00:04"),
]


def extract_frame(slug: str, video: Path, timestamp: str) -> None:
    if not video.exists():
      print(f"missing: {video}", flush=True)
      return

    out_path = OUT / f"{slug}.jpg"
    command = [
        str(FFMPEG),
        "-y",
        "-ss",
        timestamp,
        "-i",
        str(video),
        "-frames:v",
        "1",
        "-vf",
        "scale=1440:900:force_original_aspect_ratio=increase,crop=1440:900",
        "-q:v",
        "3",
        str(out_path),
    ]
    subprocess.run(command, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"{slug}: {timestamp} -> {out_path}", flush=True)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for slug, video, timestamp in VIDEOS:
        extract_frame(slug, video, timestamp)


if __name__ == "__main__":
    main()
