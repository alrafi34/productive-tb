declare module '@builder.io/partytown/react' {
  import { FC } from 'react';
  
  export interface PartytownProps {
    debug?: boolean;
    forward?: string[];
    resolveUrl?: (url: URL, location: Location, type: string) => string | undefined;
  }
  
  export const Partytown: FC<PartytownProps>;
}

declare module '@builder.io/partytown/utils' {
  export function copyLibFiles(dest: string): Promise<void>;
}
