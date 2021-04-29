// ***********************************************************************
// Assembly         : WebApp
// Author           : Alberto Palencia
// Created          : 04-29-2021
//
// Last Modified By : Alberto Palencia
// Last Modified On : 04-13-2020
// ***********************************************************************
// <copyright file="ErrorViewModel.cs" company="WebApp">
//     Copyright (c) AlbertPalencia. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

namespace WebApp.Models
{
	/// <summary>
	/// Class ErrorViewModel.
	/// </summary>
	public class ErrorViewModel
	{
		/// <summary>
		/// Gets or sets the request identifier.
		/// </summary>
		/// <value>The request identifier.</value>
		public string RequestId { get; set; }

		/// <summary>
		/// Gets a value indicating whether [show request identifier].
		/// </summary>
		/// <value><c>true</c> if [show request identifier]; otherwise, <c>false</c>.</value>
		public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
	}
}