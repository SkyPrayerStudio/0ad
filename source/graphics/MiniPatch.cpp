///////////////////////////////////////////////////////////////////////////////
//
// Name:		MiniPatch.h
// Author:		Rich Cross
// Contact:		rich@wildfiregames.com
//
///////////////////////////////////////////////////////////////////////////////

#include "precompiled.h"

#include "MiniPatch.h"
#include "Patch.h"

///////////////////////////////////////////////////////////////////////////////
// Constructor
CMiniPatch::CMiniPatch() : Tex1(0), Tex1Priority(0), m_Parent(0)
{
}

///////////////////////////////////////////////////////////////////////////////
// Destructor
CMiniPatch::~CMiniPatch()
{
}


///////////////////////////////////////////////////////////////////////////////
// GetTileIndex: get the index of this tile in the root terrain object; 
// on return, parameters x,y contain index in [0,MapSize)
void CMiniPatch::GetTileIndex(u32& x,u32& z)
{
	const ptrdiff_t tindex = this - &m_Parent->m_MiniPatches[0][0];
	x=(m_Parent->m_X*16)+tindex%16;
	z=(m_Parent->m_Z*16)+tindex/16;
}

