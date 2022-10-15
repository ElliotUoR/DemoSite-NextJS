#[macro_use]
extern crate lazy_static;

use wasm_bindgen::prelude::*;
use rand::prelude::*;

use hex_literal::hex;
use sha2::{Sha256, Sha512, Digest};


lazy_static! {
    static ref COUNT: i32 = 5; //reference for later use
    
}

//static mut hasher : Sha256 = Sha256::new();
static mut i : i32 = 5;

static mut NONCEV : i32= 0;



#[wasm_bindgen]
pub fn add(n1: i32, n2: i32) -> i32 {
    unsafe { i = n1 + n2 + i};
    unsafe {i}
}


#[wasm_bindgen]
pub fn hash() -> String{
    let base2: i32 = 2;
    let total_size = base2.pow(24);
    let mut data = vec![0u8;total_size as usize];
    let mut hasher = Sha256::new();
    hasher.update(data);
    let result = hasher.finalize();
    //println!("sha256 before write: {:x}", result);

    let strResult: String = format!("{:X}",result);
    strResult.into()
}

#[wasm_bindgen]
pub fn hashInput(input : &str) -> String{
    let mut hasher = Sha256::new();
    hasher.update(input.as_bytes());
    let result = hasher.finalize();
    //println!("sha256 before write: {:x}", result);

    let strResult: String = format!("{:X}",result);
    strResult.into()
}

//use internal nonce counter
#[wasm_bindgen]
pub fn hashInputNonce(input : &str, nonce : bool) -> String{
    if (nonce){
        unsafe { NONCEV += 1;
        let t = format!("{}{}", input, NONCEV);
        return hashInput(&t.to_owned());}
    }
    
    hashInput(input)
}

//give nonce as an argument
#[wasm_bindgen]
pub fn hashInputWithNonce(input : &str, nonce : i32) -> String{
    let t = format!("{}{}", input, nonce);
    hashInput(&t.to_owned())
}




#[wasm_bindgen]
pub fn getNonce() -> i32{
    unsafe {NONCEV}
}


#[wasm_bindgen]
pub fn take_string_by_value(x: String){

}

#[wasm_bindgen]
pub fn return_string() -> String{
    "hello".into()
}

#[wasm_bindgen]
pub fn take_option_string(x: Option<String>){}

#[wasm_bindgen]
pub fn return_option_string() -> Option<String>{
    None
}

#[wasm_bindgen]
pub fn pickRandomString() -> String {
    let vs = vec!["hello","wow","good luck","yes","no","sad face","null"];
    let sample: Vec<_> = vs
        .choose_multiple(&mut rand::thread_rng(), 1)
        .collect();
    sample[0].to_string()
}

#[wasm_bindgen]
pub fn random_float() -> f64 {
    let mut rng = rand::thread_rng();
    rng.gen()
}

//wasm-pack build