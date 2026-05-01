import { Room, CalculatedRoom, FloorSummary, Unit } from './types';

// Calculate area of a single room
export function calculateRoomArea(length: number, width: number): number {
  if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
    return 0;
  }
  return length * width;
}

// Convert between units
export function convertArea(area: number, fromUnit: Unit, toUnit: Unit): number {
  if (fromUnit === toUnit) return area;
  
  // m² to ft²
  if (fromUnit === 'm' && toUnit === 'ft') {
    return area * 10.7639;
  }
  
  // ft² to m²
  if (fromUnit === 'ft' && toUnit === 'm') {
    return area / 10.7639;
  }
  
  return area;
}

// Calculate all rooms with their areas
export function calculateAllRooms(rooms: Room[]): CalculatedRoom[] {
  return rooms.map(room => {
    const length = parseFloat(room.length);
    const width = parseFloat(room.width);
    const area = calculateRoomArea(length, width);
    
    return {
      ...room,
      area
    };
  });
}

// Calculate total area (all in same unit)
export function calculateTotalArea(calculatedRooms: CalculatedRoom[]): number {
  return calculatedRooms.reduce((sum, room) => sum + room.area, 0);
}

// Group rooms by floor and calculate summaries
export function calculateFloorSummaries(calculatedRooms: CalculatedRoom[]): FloorSummary[] {
  const floorMap = new Map<number, CalculatedRoom[]>();
  
  calculatedRooms.forEach(room => {
    const floor = room.floor || 1;
    if (!floorMap.has(floor)) {
      floorMap.set(floor, []);
    }
    floorMap.get(floor)!.push(room);
  });
  
  const summaries: FloorSummary[] = [];
  floorMap.forEach((rooms, floorNumber) => {
    summaries.push({
      floorNumber,
      totalArea: rooms.reduce((sum, room) => sum + room.area, 0),
      roomCount: rooms.length
    });
  });
  
  return summaries.sort((a, b) => a.floorNumber - b.floorNumber);
}

// Format area with unit
export function formatArea(area: number, unit: Unit): string {
  return `${area.toFixed(2)} ${unit}²`;
}

// Generate unique ID
export function generateId(): string {
  return `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Export to CSV
export function exportToCSV(calculatedRooms: CalculatedRoom[], totalArea: number): string {
  let csv = 'Room Name,Length,Width,Unit,Area,Floor\n';
  
  calculatedRooms.forEach(room => {
    const length = parseFloat(room.length) || 0;
    const width = parseFloat(room.width) || 0;
    csv += `"${room.name}",${length},${width},${room.unit},${room.area.toFixed(2)},${room.floor || 1}\n`;
  });
  
  csv += `\nTotal Floor Area,,,,${totalArea.toFixed(2)},\n`;
  
  return csv;
}

// Download file helper
export function downloadFile(content: string, filename: string, type: string = 'text/csv'): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Export to text summary
export function exportToText(calculatedRooms: CalculatedRoom[], totalArea: number, unit: Unit): string {
  let text = 'FLOOR AREA CALCULATION SUMMARY\n';
  text += '================================\n\n';
  
  const floorSummaries = calculateFloorSummaries(calculatedRooms);
  
  if (floorSummaries.length > 1) {
    floorSummaries.forEach(floor => {
      text += `Floor ${floor.floorNumber}:\n`;
      const floorRooms = calculatedRooms.filter(r => (r.floor || 1) === floor.floorNumber);
      floorRooms.forEach(room => {
        const length = parseFloat(room.length) || 0;
        const width = parseFloat(room.width) || 0;
        text += `  ${room.name}: ${length} × ${width} ${room.unit} = ${formatArea(room.area, unit)}\n`;
      });
      text += `  Subtotal: ${formatArea(floor.totalArea, unit)}\n\n`;
    });
  } else {
    calculatedRooms.forEach(room => {
      const length = parseFloat(room.length) || 0;
      const width = parseFloat(room.width) || 0;
      text += `${room.name}: ${length} × ${width} ${room.unit} = ${formatArea(room.area, unit)}\n`;
    });
  }
  
  text += `\nTOTAL FLOOR AREA: ${formatArea(totalArea, unit)}\n`;
  text += '\nCalculated via Productive Toolbox\n';
  
  return text;
}

// Find largest room
export function findLargestRoom(calculatedRooms: CalculatedRoom[]): CalculatedRoom | null {
  if (calculatedRooms.length === 0) return null;
  return calculatedRooms.reduce((largest, room) => 
    room.area > largest.area ? room : largest
  );
}
