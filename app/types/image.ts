export interface ImageDimensions {
  width: number
  height: number
}

export interface ImageVariants {
  low: Blob
  medium: Blob
  high: Blob
  dimensions: {
    low: ImageDimensions
    medium: ImageDimensions
    high: ImageDimensions
  }
}
