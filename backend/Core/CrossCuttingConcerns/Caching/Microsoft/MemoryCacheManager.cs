//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Text.RegularExpressions;
//using Core.Utilities.IoC;
//using Microsoft.Extensions.Caching.Memory;
//using Microsoft.Extensions.DependencyInjection;

//namespace Core.CrossCuttingConcerns.Caching.Microsoft
//{
//    public class MemoryCacheManager : ICacheManager
//    {
//        private IMemoryCache _cache;
//        public MemoryCacheManager()
//        {
//            _cache = ServiceTool.ServiceProvider.GetService<IMemoryCache>();
//        }
//        public T Get<T>(string key)
//        {
//            return _cache.Get<T>(key);
//        }

//        public object Get(string key)
//        {
//            return _cache.Get(key);
//        }

//        public void Add(string key, object data, int duration)
//        {
//            _cache.Set(key, data, TimeSpan.FromMinutes(duration));
//        }

//        public bool IsAdd(string key)
//        {
//            return _cache.TryGetValue(key, out _);
//        }

//        public void Remove(string key)
//        {
//            _cache.Remove(key);
//        }

//        public void RemoveByPattern(string pattern)
//        {
//            var cacheEntriesCollectionDefinition = typeof(MemoryCache).GetProperty("EntriesCollection", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
//            var cacheEntriesCollection = cacheEntriesCollectionDefinition.GetValue(_cache) as dynamic;
//            List<ICacheEntry> cacheCollectionValues = new List<ICacheEntry>();

//            foreach (var cacheItem in cacheEntriesCollection)
//            {
//                ICacheEntry cacheItemValue = cacheItem.GetType().GetProperty("Value").GetValue(cacheItem, null);
//                cacheCollectionValues.Add(cacheItemValue);
//            }

//            var regex = new Regex(pattern, RegexOptions.Singleline | RegexOptions.Compiled | RegexOptions.IgnoreCase);
//            var keysToRemove = cacheCollectionValues.Where(d => regex.IsMatch(d.Key.ToString())).Select(d => d.Key).ToList();

//            foreach (var key in keysToRemove)
//            {
//                _cache.Remove(key);
//            }
//        }
//    }
//}

using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Core.Utilities.IoC;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;

namespace Core.CrossCuttingConcerns.Caching.Microsoft
{
    public class MemoryCacheManager : ICacheManager
    {
        private IMemoryCache _cache;
        private static readonly ConcurrentDictionary<string, bool> _cacheKeys = new ConcurrentDictionary<string, bool>();

        public MemoryCacheManager()
        {
            _cache = ServiceTool.ServiceProvider.GetService<IMemoryCache>();
        }

        public T Get<T>(string key)
        {
            return _cache.Get<T>(key);
        }

        public object Get(string key)
        {
            return _cache.Get(key);
        }

        public void Add(string key, object data, int duration)
        {
            var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(duration))
                .RegisterPostEvictionCallback((k, v, r, s) =>
                {
                    // Cache'den otomatik silindiğinde key listesinden de sil
                    _cacheKeys.TryRemove(k.ToString(), out _);
                });

            _cache.Set(key, data, cacheEntryOptions);
            _cacheKeys.TryAdd(key, true);
        }

        public bool IsAdd(string key)
        {
            return _cache.TryGetValue(key, out _);
        }

        public void Remove(string key)
        {
            _cache.Remove(key);
            _cacheKeys.TryRemove(key, out _);
        }

        public void RemoveByPattern(string pattern)
        {
            var regex = new Regex(pattern, RegexOptions.Singleline | RegexOptions.Compiled | RegexOptions.IgnoreCase);
            var keysToRemove = _cacheKeys.Keys.Where(k => regex.IsMatch(k)).ToList();

            foreach (var key in keysToRemove)
            {
                Remove(key);
            }
        }
    }
}