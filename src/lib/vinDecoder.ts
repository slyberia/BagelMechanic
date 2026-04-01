// src/lib/vinDecoder.ts

export interface DecodedVehicle {
  ModelYear: string;
  Make: string;
  Model: string;
  EngineCylinders: string;
  DriveType: string;
}

export async function decodeVin(vin: string): Promise<DecodedVehicle | null> {
  try {
    const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`);
    if (!response.ok) {
      throw new Error('Failed to fetch VIN data');
    }
    const data = await response.json();
    
    if (data.Results && data.Results.length > 0) {
      const result = data.Results[0];
      
      // Scrub data to only include required fields
      return {
        ModelYear: result.ModelYear || 'N/A',
        Make: result.Make || 'N/A',
        Model: result.Model || 'N/A',
        EngineCylinders: result.EngineCylinders || 'N/A',
        DriveType: result.DriveType || 'N/A',
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error decoding VIN:', error);
    return null;
  }
}
