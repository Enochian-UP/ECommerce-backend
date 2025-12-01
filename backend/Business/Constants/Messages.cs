using Core.Entities.Concrete;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Constants
{
    public static class Messages
    {
        public static string ProductAdded = "Ürün Eklendi";
        public static string ProductNameInvalid = " Ürün ismi geçersiz";
        public static string MaintenanceTime = "Bakım zamanı";
        public static string ProductsListed="Ürünler listelendi";
        public static string ProductCountOfCategoryError = "Bir kategoride en fazla 10 adet bulunabilir.";
        public static string ProductNameAlreadyExists = "Ürün  zaten hali hazırda var";
        public static string CategoryLimitExceded = " Kategori limiti aşıldı.";
        public static string AuthorizationDenied = "Yetkiniz yok!";
        public static string UserRegistered = "Kayıt olundu.";
        public static string UserNotFound ="Kullanıcı bulunumadı.";
        public static string PasswordError="Hatalı Şifre";
        public static string SuccessfulLogin= "Giriş başarılı!";
        public static string UserAlreadyExists="Kullanıcı zaten var";
        public static string AccessTokenCreated="Token oluşturuldu.";
        public static string ProductUpdated = "Ürün güncellendi";
    }
}
