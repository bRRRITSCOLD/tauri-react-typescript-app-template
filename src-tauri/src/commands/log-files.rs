use std::fs::File;
use flate2::read::GzDecoder;
use tar::Archive;

pub fn decompress_gzip(path: String) -> Result<(), std::io::Error> {
    let gz = File::open(path)?;
    let decompressed_gz = GzDecoder::new(gz);
    Ok((decompressed_gz))
}