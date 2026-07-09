type MapDirectionsInput = {
  name: string;
  mapX?: string;
  mapY?: string;
};

function hasCoordinates(mapX?: string, mapY?: string): boolean {
  return Boolean(mapX?.trim() && mapY?.trim());
}

export function buildMapUrl({ name, mapX, mapY }: MapDirectionsInput): string {
  if (hasCoordinates(mapX, mapY)) {
    return `https://www.google.com/maps/dir/?api=1&destination=${mapY},${mapX}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;
}

export function openMapDirections(input: MapDirectionsInput): void {
  const mapUrl = buildMapUrl(input);

  try {
    const opened = window.open(mapUrl, "_blank", "noopener,noreferrer");
    if (!opened) {
      alert("길찾기를 열 수 없습니다.");
    }
  } catch {
    alert("길찾기를 열 수 없습니다.");
  }
}
