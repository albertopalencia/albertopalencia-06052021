// ***********************************************************************
// Assembly         : WebApp
// Author           : Alberto Palencia
// Created          : 04-29-2021
//
// Last Modified By : Alberto Palencia
// Last Modified On : 04-29-2021
// ***********************************************************************
// <copyright file="HomeController.cs" company="WebApp">
//     Copyright (c) AlbertPalencia. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************
using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers
{
	/// <summary>
	/// Class HomeController.
	/// Implements the <see cref="Microsoft.AspNetCore.Mvc.Controller" />
	/// </summary>
	/// <seealso cref="Microsoft.AspNetCore.Mvc.Controller" />
	public class HomeController : Controller
	{
		/// <summary>
		/// Indexes this instance.
		/// </summary>
		/// <returns>IActionResult.</returns>
		public IActionResult Index()
		{
			return View();
		}
	}
}